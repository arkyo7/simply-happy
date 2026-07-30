import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BuyButton } from "./BuyButton";
import { OFFER_ANCHOR_ID, siteConfig } from "@/config/siteConfig";

const included = [
  "Guia completo em PDF",
  "Sites e agências de emprego",
  "Estrutura de CV",
  "Carta de motivação e mensagens",
  "Preparação para entrevistas",
  "Informações sobre documentos e contratos",
  "Trabalho para estudantes",
  "Plano de ação de 14 dias",
  "Prompts úteis de inteligência artificial",
];

export function OfferSection() {
  return (
    <section id={OFFER_ANCHOR_ID} className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-[900px] rounded-2xl border border-belgium-yellow/30 bg-surface p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] sm:p-10 md:p-14">
          <span className="inline-block rounded-full border border-belgium-red/50 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-belgium-red">
            PREÇO DE LANÇAMENTO
          </span>

          <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {siteConfig.productName}
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
            Um guia prático para brasileiros que querem começar a procurar trabalho na Bélgica com
            mais organização e direção.
          </p>

          <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {included.map((i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-belgium-yellow" aria-hidden="true" />
                <span>{i}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-end gap-x-6 gap-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Preço normal</p>
              <p className="text-lg text-belgium-red line-through">{siteConfig.originalPrice}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Preço de lançamento</p>
              <p className="text-4xl font-extrabold text-belgium-yellow sm:text-5xl">
                {siteConfig.currentPrice}
              </p>
            </div>
            <p className="pb-2 text-sm text-muted-foreground">Pagamento único</p>
          </div>

          <BuyButton className="mt-8 w-full sm:w-auto">
            Comprar agora por {siteConfig.currentPrice}
          </BuyButton>



          <p className="mt-4 text-sm text-muted-foreground">
            Produto digital • Sem assinatura • Acesso após a confirmação do pagamento
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Ao continuar, você declara que leu os{" "}
            <Link to="/termos" className="underline-offset-4 hover:underline">
              Termos de Uso
            </Link>
            , a{" "}
            <Link to="/privacidade" className="underline-offset-4 hover:underline">
              Política de Privacidade
            </Link>{" "}
            e a{" "}
            <Link to="/reembolso" className="underline-offset-4 hover:underline">
              Política de Reembolso
            </Link>
            .
          </p>
          <p className="mt-2 text-xs text-muted-foreground/80">
            O preço de lançamento poderá ser alterado em uma futura atualização do produto.
          </p>
        </div>
      </div>
    </section>
  );
}
