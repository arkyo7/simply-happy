import { BuyButton } from "./BuyButton";
import { siteConfig } from "@/config/siteConfig";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-t-[3px] border-b border-belgium-yellow border-b-border bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <span className="relative z-10 flex h-full items-center whitespace-nowrap text-sm font-bold leading-none tracking-tight text-foreground sm:text-base">
          Kit Emprego Bélgica
        </span>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-sm leading-none text-muted-foreground md:flex">
          <a
            href="#conteudo"
            className="inline-flex items-center whitespace-nowrap leading-none transition-colors hover:text-foreground"
          >
            O que você recebe
          </a>
          <a
            href="#para-quem"
            className="inline-flex items-center whitespace-nowrap leading-none transition-colors hover:text-foreground"
          >
            Para quem é
          </a>
          <a
            href="#duvidas"
            className="inline-flex items-center whitespace-nowrap leading-none transition-colors hover:text-foreground"
          >
            Dúvidas
          </a>
        </nav>

        <div className="relative z-10 ml-auto flex items-center">
          <BuyButton
            size="md"
            className="hidden h-[42px] items-center justify-center whitespace-nowrap px-6 py-0 leading-none hover:translate-y-0 md:inline-flex"
          >
            Comprar por {siteConfig.currentPrice}
          </BuyButton>
          <BuyButton
            size="sm"
            className="inline-flex h-[42px] items-center justify-center whitespace-nowrap px-5 py-0 leading-none hover:translate-y-0 md:hidden"
          >
            Comprar
          </BuyButton>
        </div>
      </div>

    </header>
  );
}
