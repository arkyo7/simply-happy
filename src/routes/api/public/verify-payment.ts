import { createFileRoute } from "@tanstack/react-router";

/**
 * Verificação real do pagamento na Stripe.
 *
 * - Recebe o session_id da Checkout Session.
 * - Consulta a sessão diretamente na API da Stripe usando STRIPE_SECRET_KEY (somente backend).
 * - Confirma payment_status = "paid", amount_total = 990 e currency = "eur".
 * - Confirma que a sessão pertence ao Payment Link correto (STRIPE_PAYMENT_LINK_ID).
 * - Só então gera uma URL assinada e temporária (10 minutos) do PDF privado.
 *
 * Nenhum caminho permanente do PDF é exposto ao frontend.
 */

const EXPECTED_AMOUNT_TOTAL = 990;
const EXPECTED_CURRENCY = "eur";
const SIGNED_URL_TTL_SECONDS = 600; // 10 minutos

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

type StripeSession = {
  id: string;
  payment_status?: string;
  status?: string;
  amount_total?: number;
  currency?: string;
  payment_link?: string | { id?: string } | null;
};

export const Route = createFileRoute("/api/public/verify-payment")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),

      POST: async ({ request }) => {
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        const paymentLinkId = process.env.STRIPE_PAYMENT_LINK_ID;
        const storageUrl = process.env.SUPABASE_URL;
        const storageKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        const bucket = process.env.PRIVATE_PDF_BUCKET ?? "produtos";
        const objectPath = process.env.PRIVATE_PDF_PATH ?? "kit-emprego-belgica-2026.pdf";

        if (!stripeSecretKey) {
          return json({ status: "error", message: "Pagamento indisponível no momento." }, 500);
        }

        let sessionId: unknown;
        try {
          const body = (await request.json()) as { session_id?: unknown };
          sessionId = body?.session_id;
        } catch {
          return json({ status: "invalid", message: "Requisição inválida." }, 400);
        }

        if (typeof sessionId !== "string" || !/^cs_[A-Za-z0-9_]{10,200}$/.test(sessionId)) {
          return json({ status: "invalid", message: "Sessão de pagamento inválida." }, 400);
        }

        // 1. Consulta a Checkout Session na Stripe
        const stripeRes = await fetch(
          `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
          { headers: { Authorization: `Bearer ${stripeSecretKey}` } },
        );

        if (!stripeRes.ok) {
          return json({ status: "unconfirmed", message: "Pagamento não confirmado." }, 200);
        }

        const session = (await stripeRes.json()) as StripeSession;

        // 2. Validações obrigatórias
        const linkId =
          typeof session.payment_link === "string"
            ? session.payment_link
            : (session.payment_link?.id ?? null);

        const isValid =
          session.payment_status === "paid" &&
          session.amount_total === EXPECTED_AMOUNT_TOTAL &&
          session.currency?.toLowerCase() === EXPECTED_CURRENCY &&
          (!paymentLinkId || linkId === paymentLinkId);

        if (!isValid) {
          return json({ status: "unconfirmed", message: "Pagamento não confirmado." }, 200);
        }

        // 3. URL assinada e temporária do PDF privado
        if (!storageUrl || !storageKey) {
          return json(
            {
              status: "error",
              message: "Armazenamento privado ainda não configurado.",
            },
            500,
          );
        }

        const signRes = await fetch(
          `${storageUrl.replace(/\/+$/, "")}/storage/v1/object/sign/${bucket}/${objectPath}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: storageKey,
              Authorization: `Bearer ${storageKey}`,
            },
            body: JSON.stringify({ expiresIn: SIGNED_URL_TTL_SECONDS }),
          },
        );

        if (!signRes.ok) {
          return json(
            { status: "error", message: "Não foi possível gerar o link de download." },
            500,
          );
        }

        const signed = (await signRes.json()) as { signedURL?: string; signedUrl?: string };
        const path = signed.signedURL ?? signed.signedUrl;
        if (!path) {
          return json(
            { status: "error", message: "Não foi possível gerar o link de download." },
            500,
          );
        }

        const downloadUrl = path.startsWith("http")
          ? path
          : `${storageUrl.replace(/\/+$/, "")}/storage/v1${path.startsWith("/") ? "" : "/"}${path}`;

        return json({
          status: "paid",
          downloadUrl,
          expiresIn: SIGNED_URL_TTL_SECONDS,
        });
      },
    },
  },
});
