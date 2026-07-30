export const siteConfig = {
  productName: "Kit Emprego Bélgica 2026",
  currentPrice: "€9,90",
  originalPrice: "€39,90",
  checkoutUrl: "#",
  offerEndDate: null as string | null,
  updatedYear: "2026",
  supportEmail: "",
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined) ?? "",
  images: {
    hero: "/image/hero-belgica.webp",
    cover: "/image/capa-kit-emprego-belgica.webp",
    mockup: "/image/mockup-kit-emprego-belgica.webp",
  },
} as const;

export const OFFER_ANCHOR_ID = "oferta";

/**
 * Retorna a URL absoluta quando VITE_SITE_URL estiver configurada.
 * Caso contrário mantém o caminho relativo (seguro para SSR).
 */
export function absoluteUrl(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/+$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!base) return normalized;
  return `${base}${normalized}`.replace(/([^:]\/)\/+/g, "$1");
}
