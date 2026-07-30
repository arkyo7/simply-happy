import { BuyButton } from "./BuyButton";
import { siteConfig } from "@/config/siteConfig";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <span className="truncate text-base font-bold tracking-tight text-foreground">
          Kit Emprego Bélgica
        </span>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
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
          <BuyButton size="md" className="hidden md:inline-flex">
            Comprar por {siteConfig.currentPrice}
          </BuyButton>
          <BuyButton size="sm" className="md:hidden">
            Comprar
          </BuyButton>
        </div>
      </div>
    </header>
  );
}
