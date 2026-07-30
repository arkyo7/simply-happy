import { BuyButton } from "./BuyButton";
import { siteConfig } from "@/config/siteConfig";

export function FinalCta() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[720px] px-4 py-20 text-center sm:px-6 md:py-28">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          Comece sua procura por emprego com mais direção.
        </h2>
        <p className="mx-auto mt-5 max-w-[56ch] text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Tenha em mãos um guia organizado para descobrir onde procurar, como se preparar e qual
          deve ser seu próximo passo.
        </p>

        <div className="mt-8 flex items-end justify-center gap-4">
          <span className="pb-1 text-lg text-belgium-red line-through">
            {siteConfig.originalPrice}
          </span>
          <span className="text-4xl font-extrabold text-belgium-yellow">
            {siteConfig.currentPrice}
          </span>
        </div>

        <BuyButton className="mt-8 w-full sm:w-auto">Quero começar agora</BuyButton>

        <p className="mt-4 text-sm text-muted-foreground">
          Pagamento único • Produto digital • Atualizado para 2026
        </p>
      </div>
    </section>
  );
}
