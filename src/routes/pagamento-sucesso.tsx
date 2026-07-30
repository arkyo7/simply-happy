import { createFileRoute, Link } from "@tanstack/react-router";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const title = "Pagamento confirmado | Kit Emprego Bélgica 2026";
const description =
  "Página de confirmação de pagamento do Kit Emprego Bélgica 2026. O download é liberado somente após a confirmação do pagamento.";

/**
 * Enquanto não existir verificação real do pagamento no backend (Stripe),
 * o download permanece bloqueado. Esta flag NUNCA deve ser ativada apenas
 * porque o visitante acessou esta URL.
 */
const isPaymentConfirmed = false;

export const Route = createFileRoute("/pagamento-sucesso")({
  component: PaymentSuccess,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Pagamento confirmado | Kit Emprego Bélgica 2026" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Pagamento confirmado | Kit Emprego Bélgica 2026" },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/pagamento-sucesso") }],
  }),
});

function PaymentSuccess() {
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
          Obrigado pela sua compra
        </h1>
        <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
          Assim que o pagamento do {siteConfig.productName} for confirmado, o link de download será
          liberado nesta página e enviado para o e-mail informado no checkout.
        </p>

        <div className="mt-10 rounded-2xl border border-belgium-yellow/30 bg-surface p-6 sm:p-8">
          {isPaymentConfirmed ? (
            <a
              href="#"
              className="inline-flex h-[46px] items-center justify-center rounded-xl bg-belgium-yellow px-6 text-sm font-semibold leading-none text-belgium-black"
            >
              Baixar o Kit
            </a>
          ) : (
            <>
              <p className="text-sm font-semibold text-foreground">
                Aguardando confirmação do pagamento
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                O botão de download aparece automaticamente aqui depois que o pagamento for
                confirmado pelo provedor de pagamento. O acesso à página, sozinho, não libera o
                arquivo.
              </p>
            </>
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
