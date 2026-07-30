import { BuyButton } from "./BuyButton";
import { siteConfig } from "@/config/siteConfig";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <span className="truncate whitespace-nowrap text-sm font-bold tracking-tight text-foreground sm:text-base">
          Kit Emprego Bélgica
        </span>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#conteudo" className="transition-colors hover:text-foreground">
              O que você recebe
            </a>
            <a href="#para-quem" className="transition-colors hover:text-foreground">
              Para quem é
            </a>
            <a href="#duvidas" className="transition-colors hover:text-foreground">
              Dúvidas
            </a>
          </nav>
          <BuyButton
            size="md"
            className="hidden h-[42px] whitespace-nowrap px-6 md:inline-flex"
          >
            Comprar por {siteConfig.currentPrice}
          </BuyButton>
          <BuyButton size="sm" className="h-[38px] whitespace-nowrap md:hidden">
            Comprar
          </BuyButton>
        </div>
      </div>
    </header>
  );
}
