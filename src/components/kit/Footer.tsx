import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { legalConfig } from "@/config/legalConfig";

export function Footer() {
  const email = legalConfig.seller.email;

  return (
    <footer className="border-t border-border bg-surface-2">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-base font-semibold text-foreground">{siteConfig.productName}</p>
          <p className="mt-2 max-w-[46ch] text-sm text-muted-foreground">
            Guia digital de orientação para brasileiros que procuram trabalho na Bélgica.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground md:justify-end">
          <Link to="/termos" className="transition-colors hover:text-foreground">
            Termos de uso
          </Link>
          <Link to="/privacidade" className="transition-colors hover:text-foreground">
            Política de privacidade
          </Link>
          <Link to="/reembolso" className="transition-colors hover:text-foreground">
            Política de reembolso
          </Link>
          {email && (
            <a
              href={`mailto:${email}`}
              className="transition-colors hover:text-foreground"
            >
              Contato
            </a>
          )}
        </nav>
      </div>
      <div className="mx-auto max-w-[1200px] border-t border-border px-4 py-6 sm:px-6">
        <p className="text-xs text-muted-foreground">
          © 2026 Kit Emprego Bélgica. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
