import { cn } from "@/lib/utils";

export const KIT_PDF_PATH = "/kit-emprego-belgica-2026.pdf";

type KitPdfLinksProps = {
  className?: string;
};

const linkBase =
  "inline-flex h-[46px] items-center justify-center whitespace-nowrap rounded-xl border border-belgium-yellow/40 px-6 text-sm font-semibold leading-none text-belgium-yellow transition-colors hover:border-belgium-yellow hover:bg-belgium-yellow/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-belgium-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function KitPdfLinks({ className }: KitPdfLinksProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <a href={KIT_PDF_PATH} target="_blank" rel="noopener noreferrer" className={linkBase}>
        Ver o Kit
      </a>
      <a href={KIT_PDF_PATH} download="Kit_Emprego_Belgica_2026.pdf" className={linkBase}>
        Baixar o Kit
      </a>
    </div>
  );
}
