import { cn } from "@/lib/utils";
import { OFFER_ANCHOR_ID, siteConfig } from "@/config/siteConfig";
import { isLegalConfigComplete } from "@/config/legalConfig";

type BuyButtonProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function scrollToOffer() {
  const el = document.getElementById(OFFER_ANCHOR_ID);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * O checkout só pode ser ativado quando os dados legais obrigatórios
 * estiverem preenchidos. Caso contrário, o botão continua rolando até a oferta.
 */
export function isCheckoutActive(): boolean {
  const configured = siteConfig.checkoutUrl !== "#" && siteConfig.checkoutUrl !== "";
  if (!configured) return false;
  if (!isLegalConfigComplete()) {
    if (import.meta.env.DEV) {
      console.error(
        "Não é possível ativar o checkout antes de preencher os dados legais obrigatórios.",
      );
    }
    return false;
  }
  return true;
}

export function BuyButton({ children, className, size = "lg" }: BuyButtonProps) {
  const isPlaceholder = !isCheckoutActive();

  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold text-belgium-black transition-all duration-200 bg-belgium-yellow hover:bg-belgium-yellow-hover hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-belgium-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-4 text-base",
  };

  return (
    <a
      href={isPlaceholder ? `#${OFFER_ANCHOR_ID}` : siteConfig.checkoutUrl}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noopener noreferrer"}
      onClick={(e) => {
        if (isPlaceholder) {
          e.preventDefault();
          scrollToOffer();
        }
      }}
      className={cn(base, sizes[size], className)}
    >
      {children}
    </a>
  );
}
