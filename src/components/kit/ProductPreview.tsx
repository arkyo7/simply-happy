import { BuyButton } from "./BuyButton";
import { siteConfig } from "@/config/siteConfig";

const specs = [
  "Guia digital em PDF",
  "21 páginas",
  "Atualizado para 2026",
  "Leitura no celular, tablet ou computador",
  "Acesso após a confirmação do pagamento",
  "Sem assinatura mensal",
];

export function ProductPreview() {
  return (
    <section className="border-t border-border bg-surface-2">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:gap-20">
        <div className="flex items-center justify-center">
          <img
            src={siteConfig.images.cover}
            alt="Capa do Kit Emprego Bélgica 2026"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full max-w-[280px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] md:max-w-[360px] lg:max-w-[390px]"
          />
        </div>

        <div>
          <h2 className="max-w-[24ch] text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
            Um guia prático para consultar durante toda a sua procura por emprego.
          </h2>
          <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            O material reúne informações, exemplos, modelos, checklists e um plano de ação em um
            único PDF.
          </p>

          <ul className="mt-8 space-y-3 text-[15px] text-foreground/90">
            {specs.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-belgium-yellow"
                />
                {s}
              </li>
            ))}
          </ul>

          <BuyButton className="mt-10 w-full sm:w-auto">Comprar agora</BuyButton>

        </div>
      </div>
    </section>
  );
}
