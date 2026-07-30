import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { legalConfig } from "@/config/legalConfig";

type LegalPageLayoutProps = {
  title: string;
  children: ReactNode;
};

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-t-[3px] border-b border-belgium-yellow border-b-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-[820px] items-center justify-between px-4 sm:px-6">
          <span className="whitespace-nowrap text-sm font-bold leading-none tracking-tight text-foreground sm:text-base">
            Kit Emprego Bélgica
          </span>
          <Link
            to="/"
            className="whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-4 py-14 sm:px-6 md:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Última atualização: {legalConfig.lastUpdated}
        </p>

        <div className="legal-content mt-10 space-y-8 text-[15px] leading-relaxed text-muted-foreground">
          {children}
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[820px] flex-wrap gap-x-6 gap-y-3 px-4 py-8 text-sm text-muted-foreground sm:px-6">
          <Link to="/termos" className="transition-colors hover:text-foreground">
            Termos de uso
          </Link>
          <Link to="/privacidade" className="transition-colors hover:text-foreground">
            Política de privacidade
          </Link>
          <Link to="/reembolso" className="transition-colors hover:text-foreground">
            Política de reembolso
          </Link>
        </div>
      </footer>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function SellerDetails() {
  const fields = getVisibleSellerFieldsSafe();
  if (fields.length === 0) {
    return (
      <p>
        Os dados completos do responsável serão publicados nesta página assim que a atividade
        comercial estiver formalizada.
      </p>
    );
  }
  return (
    <ul className="space-y-2">
      {fields.map((f) => (
        <li key={f.label}>
          <span className="text-foreground">{f.label}:</span> {f.value}
        </li>
      ))}
    </ul>
  );
}

function getVisibleSellerFieldsSafe() {
  const s = legalConfig.seller;
  return [
    { label: "Responsável", value: s.legalName },
    { label: "Nome comercial", value: s.tradeName },
    { label: "E-mail", value: s.email },
    { label: "Telefone", value: s.phone },
    { label: "Endereço", value: s.businessAddress },
    { label: "Número de empresa", value: s.enterpriseNumber },
    { label: "Número de IVA", value: s.vatNumber },
  ].filter((f) => f.value.trim().length > 0);
}
