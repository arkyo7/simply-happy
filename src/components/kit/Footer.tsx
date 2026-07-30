import { siteConfig } from "@/config/siteConfig";

export function Footer() {
  const links = [
    { label: "Termos de uso", href: "#" },
    { label: "Política de privacidade", href: "#" },
    { label: "Política de reembolso", href: "#" },
    ...(siteConfig.supportEmail
      ? [{ label: "Contato", href: `mailto:${siteConfig.supportEmail}` }]
      : []),
  ];

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
          {links.map((l) => (
            <a key={l.label} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
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
