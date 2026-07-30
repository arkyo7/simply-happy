import { BuyButton } from "./BuyButton";
import { siteConfig } from "@/config/siteConfig";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-foreground">
          Kit por <span className="text-belgium-yellow">{siteConfig.currentPrice}</span>
        </span>
        <BuyButton size="md">Comprar agora</BuyButton>
      </div>
    </div>
  );
}
