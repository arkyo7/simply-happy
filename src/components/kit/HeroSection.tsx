import { Check } from "lucide-react";
import { SafeImage } from "./SafeImage";
import { BuyButton } from "./BuyButton";
import { siteConfig } from "@/config/siteConfig";

const bullets = [
  "Onde encontrar vagas e agências de emprego",
  "Como preparar um CV para o mercado belga",
  "Modelos de mensagens e carta de motivação",
  "Documentos, entrevistas e plano de ação",
  "Informações atualizadas para 2026",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={siteConfig.images.hero}
          alt="Brasileiro observando novas oportunidades profissionais em Bruxelas."
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.88)_60%,rgba(0,0,0,0.95)_100%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.82)_45%,rgba(0,0,0,0.45)_100%)]" />
      </div>


      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block rounded-full border border-belgium-yellow/40 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-belgium-yellow">
            GUIA ATUALIZADO PARA 2026
          </span>

          <h1 className="mt-6 max-w-[18ch] text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            Pare de procurar <span className="text-belgium-yellow">emprego na Bélgica</span> no
            escuro.
          </h1>

          <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tenha em mãos um passo a passo criado para brasileiros que precisam entender onde
            procurar vagas, como preparar o currículo e como começar suas candidaturas com mais
            direção.
          </p>

          <ul className="mt-8 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-belgium-yellow" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-end gap-x-4 gap-y-1">
            <div>
              <p className="text-xs text-muted-foreground">Preço normal</p>
              <p className="text-lg text-belgium-red line-through">{siteConfig.originalPrice}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Hoje por apenas</p>
              <p className="text-4xl font-extrabold text-belgium-yellow">
                {siteConfig.currentPrice}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <BuyButton className="w-full sm:w-auto">Quero o Kit Emprego Bélgica</BuyButton>
            <p className="mt-4 text-sm text-muted-foreground">
              Produto digital em PDF • Pagamento único • Sem assinatura
            </p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              Orientação prática. Sem promessas de emprego garantido.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[520px]">
          <SafeImage
            src={siteConfig.images.mockup}
            alt="Mockup digital do Kit Emprego Bélgica 2026."
            ratio="4 / 5"
            fit="contain"
            loading="eager"
            fetchPriority="high"
            className="rounded-none border-0 bg-transparent"
            imgClassName="drop-shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
          />
        </div>

      </div>
    </section>
  );
}
