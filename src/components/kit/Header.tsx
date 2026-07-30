import { BuyButton } from "./BuyButton";
import { siteConfig } from "@/config/siteConfig";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-t-[3px] border-b border-belgium-yellow border-b-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <span className="flex h-full items-center whitespace-nowrap text-sm font-bold leading-none tracking-tight text-foreground sm:text-base">
          Kit Emprego Bélgica
        </span>

        <div className="flex items-center gap-6">
          <nav className="hidden h-full items-center gap-7 text-sm leading-none text-muted-foreground md:flex">
            <a
              href="#conteudo"
              className="inline-flex h-full items-center whitespace-nowrap leading-none transition-colors hover:text-foreground"
            >
              O que você recebe
            </a>
            <a
              href="#para-quem"
              className="inline-flex h-full items-center whitespace-nowrap leading-none transition-colors hover:text-foreground"
            >
              Para quem é
            </a>
            <a
              href="#duvidas"
              className="inline-flex h-full items-center whitespace-nowrap leading-none transition-colors hover:text-foreground"
            >
              Dúvidas
            </a>
          </nav>
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
