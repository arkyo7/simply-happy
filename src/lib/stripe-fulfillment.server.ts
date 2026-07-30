import { createHmac, timingSafeEqual, createHash } from "node:crypto";
import { get, put } from "@vercel/blob";

const PDF_PATH = "kit-emprego-belgica-2026.pdf";
const EXPECTED_AMOUNT_TOTAL = 990;
const EXPECTED_CURRENCY = "eur";
const SIGNATURE_TOLERANCE_SECONDS = 300;
const ACCEPTED_EVENTS = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

export type WebhookResult = { status: number; body: Record<string, unknown> };

type StripeSession = {
  id?: string;
  mode?: string;
  payment_status?: string;
  payment_link?: string | { id?: string } | null;
  amount_total?: number;
  currency?: string;
  customer_email?: string | null;
  customer_details?: { email?: string | null } | null;
};

type StripeEvent = {
  type?: string;
  livemode?: boolean;
  data?: { object?: StripeSession };
};

function requireEnv(name: string): string | null {
  const value = process.env[name];
  return value && value.trim() ? value : null;
}

/** Stripe signature scheme: t=<timestamp>,v1=<hmac sha256 of `${t}.${rawBody}`> */
export function verifyStripeSignature(
  rawBody: string,
  header: string | null,
  secret: string,
): boolean {
  if (!header) return false;

  let timestamp: string | null = null;
  const signatures: string[] = [];

  for (const part of header.split(",")) {
    const [key, value] = part.split("=", 2);
    if (!key || !value) continue;
    if (key.trim() === "t") timestamp = value.trim();
    else if (key.trim() === "v1") signatures.push(value.trim());
  }

  if (!timestamp || signatures.length === 0) return false;

  const timestampSeconds = Number(timestamp);
  if (!Number.isFinite(timestampSeconds)) return false;
  if (Math.abs(Math.floor(Date.now() / 1000) - timestampSeconds) > SIGNATURE_TOLERANCE_SECONDS) {
    return false;
  }

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");

  return signatures.some((signature) => {
    const candidate = Buffer.from(signature, "utf8");
    return candidate.length === expectedBuffer.length && timingSafeEqual(candidate, expectedBuffer);
  });
}

/** Deterministic UUID v4-shaped value derived from the Stripe session id. */
export function deterministicUuid(seed: string): string {
  const hash = createHash("sha256").update(seed).digest();
  const bytes = Buffer.from(hash.subarray(0, 16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function extractEmail(session: StripeSession): string | null {
  const email = session.customer_details?.email ?? session.customer_email ?? null;
  if (!email) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

function isValidPurchase(session: StripeSession, paymentLinkId: string): boolean {
  const linkId =
    typeof session.payment_link === "string"
      ? session.payment_link
      : (session.payment_link?.id ?? null);

  return (
    session.mode === "payment" &&
    session.payment_status === "paid" &&
    linkId === paymentLinkId &&
    session.amount_total === EXPECTED_AMOUNT_TOTAL &&
    session.currency?.toLowerCase() === EXPECTED_CURRENCY
  );
}

async function streamToBase64(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))).toString("base64");
}

const emailHtml = `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:24px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;color:#111111;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:28px;">
      <h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;">Seu Kit Emprego Bélgica 2026 chegou</h1>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Olá!</p>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Obrigado pela sua compra.</p>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">O seu Kit Emprego Bélgica 2026 está anexado a este e-mail em formato PDF.</p>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Recomendamos que você salve o arquivo no seu celular ou computador para poder consultá-lo sempre que precisar.</p>
      <p style="margin:24px 0 0;font-size:15px;line-height:1.6;">Atenciosamente,<br />Kit Emprego Bélgica</p>
    </div>
  </body>
</html>`;

export async function handleStripeWebhook(
  rawBody: string,
  signatureHeader: string | null,
): Promise<WebhookResult> {
  const webhookSecret = requireEnv("STRIPE_WEBHOOK_SECRET");
  const paymentLinkId = requireEnv("STRIPE_PAYMENT_LINK_ID");
  const brevoApiKey = requireEnv("BREVO_API_KEY");
  const senderName = requireEnv("BREVO_SENDER_NAME");
  const senderEmail = requireEnv("BREVO_SENDER_EMAIL");

  if (!webhookSecret || !paymentLinkId || !brevoApiKey || !senderName || !senderEmail) {
    console.error("Webhook de pagamento: configuração de ambiente ausente.");
    return { status: 500, body: { error: "configuration_error" } };
  }

  if (!rawBody) return { status: 400, body: { error: "invalid_body" } };

  if (!verifyStripeSignature(rawBody, signatureHeader, webhookSecret)) {
    return { status: 400, body: { error: "invalid_signature" } };
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(rawBody) as StripeEvent;
  } catch {
    return { status: 400, body: { error: "invalid_body" } };
  }

  if (!event.type || !ACCEPTED_EVENTS.has(event.type)) {
    return { status: 200, body: { received: true, ignored: true } };
  }

  const session = event.data?.object ?? {};
  const sessionId = session.id;
  if (!sessionId) return { status: 400, body: { error: "invalid_body" } };

  if (!isValidPurchase(session, paymentLinkId)) {
    return { status: 200, body: { received: true, ignored: true } };
  }

  const email = extractEmail(session);
  if (!email) {
    console.error("Webhook de pagamento: sessão paga sem e-mail válido.");
    return { status: 200, body: { received: true, ignored: true } };
  }

  const markerPath = `fulfillments/${sessionId}.json`;

  try {
    const existing = await get(markerPath, { access: "private" });
    if (existing && existing.statusCode === 200 && existing.stream) {
      const marker = JSON.parse(
        Buffer.from(await streamToBase64(existing.stream), "base64").toString("utf8"),
      ) as { status?: string };
      if (marker.status === "sent") {
        return { status: 200, body: { received: true, alreadyDelivered: true } };
      }
    }
  } catch {
    // Marcador ausente ou ilegível: segue para a entrega.
  }

  let pdfBase64: string;
  try {
    const pdf = await get(PDF_PATH, { access: "private" });
    if (!pdf || pdf.statusCode !== 200 || !pdf.stream) {
      console.error("Webhook de pagamento: PDF privado indisponível.");
      return { status: 500, body: { error: "asset_unavailable" } };
    }
    pdfBase64 = await streamToBase64(pdf.stream);
  } catch {
    console.error("Webhook de pagamento: falha ao ler o PDF privado.");
    return { status: 500, body: { error: "asset_unavailable" } };
  }

  const idempotencyKey = deterministicUuid(sessionId);

  const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": brevoApiKey,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email }],
      replyTo: { email: senderEmail, name: senderName },
      subject: "Seu Kit Emprego Bélgica 2026 chegou",
      htmlContent: emailHtml,
      attachment: [{ content: pdfBase64, name: PDF_PATH }],
      tags: ["kit-emprego-belgica", "stripe-fulfillment"],
      headers: { "Idempotency-Key": idempotencyKey },
    }),
  });

  let messageId: string | null = null;

  if (brevoResponse.ok) {
    const payload = (await brevoResponse.json().catch(() => ({}))) as { messageId?: string };
    messageId = payload.messageId ?? null;
  } else {
    const errorBody = (await brevoResponse.json().catch(() => ({}))) as { code?: string };
    if (errorBody.code !== "duplicate_parameter") {
      console.error(`Webhook de pagamento: erro Brevo [${brevoResponse.status}].`);
      return { status: 500, body: { error: "delivery_failed" } };
    }
  }

  try {
    await put(
      markerPath,
      JSON.stringify({
        sessionId,
        status: "sent",
        sentAt: new Date().toISOString(),
        messageId,
      }),
      {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json",
      },
    );
  } catch {
    console.error("Webhook de pagamento: falha ao gravar o marcador de entrega.");
  }

  return { status: 200, body: { received: true, delivered: true } };
}
