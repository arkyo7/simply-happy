import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const title = "Pagamento confirmado | Kit Emprego Bélgica 2026";
const description =
  "Página de confirmação de pagamento do Kit Emprego Bélgica 2026. O download é liberado somente após a confirmação do pagamento pela Stripe.";

export const Route = createFileRoute("/pagamento-sucesso")({
  component: PaymentSuccess,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/pagamento-sucesso") }],
  }),
});

type State = { kind: "verifying" } | { kind: "paid"; downloadUrl: string } | { kind: "failed" };

function PaymentSuccess() {
  const [state, setState] = useState<State>({ kind: "verifying" });

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) {
      setState({ kind: "failed" });
      return;
    }

    let active = true;
    fetch("/api/public/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((res) => res.json())
      .then((data: { status?: string; downloadUrl?: string }) => {
        if (!active) return;
        if (data.status === "paid" && data.downloadUrl) {
          setState({ kind: "paid", downloadUrl: data.downloadUrl });
        } else {
          setState({ kind: "failed" });
        }
      })
      .catch(() => active && setState({ kind: "failed" }));

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-t-[3px] border-b border-belgium-yellow border-b-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-[820px] items-center justify-between px-4 sm:px-6">
          <span className="whitespace-nowrap text-sm font-bold leading-none tracking-tight text-foreground sm:text-base">
            Kit Emprego Bélgica
          </span>
          <Link
            to="/"
            className="whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-4 py-16 sm:px-6 md:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {state.kind === "paid" ? "Pagamento confirmado!" : "Obrigado pela sua compra"}
        </h1>

        <div className="mt-10 rounded-2xl border border-belgium-yellow/30 bg-surface p-6 sm:p-8">
          {state.kind === "verifying" && (
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Estamos confirmando seu pagamento…
            </p>
          )}

          {state.kind === "paid" && (
            <>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Seu {siteConfig.productName} está pronto para download.
              </p>
              <a
                href={state.downloadUrl}
                className="mt-6 inline-flex h-[46px] items-center justify-center rounded-xl bg-belgium-yellow px-6 text-sm font-semibold leading-none text-belgium-black transition-colors hover:bg-belgium-yellow-hover"
              >
                Baixar o Kit
              </a>
              <p className="mt-4 text-xs text-muted-foreground">
                Este link de download é temporário e expira em 10 minutos.
              </p>
            </>
          )}

          {state.kind === "failed" && (
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Não foi possível confirmar o pagamento. Verifique sua compra ou entre em contato
              conosco.
            </p>
          )}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Precisa de ajuda?{" "}
          <Link to="/reembolso" className="underline-offset-4 hover:underline">
            Política de reembolso
          </Link>{" "}
          e{" "}
          <Link to="/termos" className="underline-offset-4 hover:underline">
            Termos de uso
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
