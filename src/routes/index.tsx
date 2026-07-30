import { createFileRoute } from "@tanstack/react-router";
import { LaunchBar } from "@/components/kit/LaunchBar";
import { Header } from "@/components/kit/Header";
import { HeroSection } from "@/components/kit/HeroSection";
import { ProblemSection } from "@/components/kit/ProblemSection";
import { GuideContents } from "@/components/kit/GuideContents";
import { ProductPreview } from "@/components/kit/ProductPreview";
import { AudienceSection } from "@/components/kit/AudienceSection";
import { OfferSection } from "@/components/kit/OfferSection";
import { FaqSection, faqs } from "@/components/kit/FaqSection";
import { Footer } from "@/components/kit/Footer";
import { MobileStickyCta } from "@/components/kit/MobileStickyCta";

const title = "Kit Emprego Bélgica 2026 | Guia para Brasileiros";
const description =
  "Descubra onde procurar vagas, como preparar seu CV, sua carta de motivação e suas candidaturas na Bélgica com um guia prático e atualizado para 2026.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: "Kit Emprego Bélgica 2026" },
      {
        property: "og:description",
        content:
          "Um passo a passo prático para brasileiros que querem procurar trabalho na Bélgica com mais direção.",
      },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/image/mockup-kit-emprego-belgica.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kit Emprego Bélgica 2026" },
      {
        name: "twitter:description",
        content:
          "Um passo a passo prático para brasileiros que querem procurar trabalho na Bélgica com mais direção.",
      },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "preload",
        as: "image",
        href: "/image/hero-belgica.webp",
        type: "image/webp",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Kit Emprego Bélgica 2026",
          description,
          image: "/image/mockup-kit-emprego-belgica.webp",
          offers: {
            "@type": "Offer",
            price: "9.90",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LaunchBar />
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <GuideContents />
        <ProductPreview />
        <AudienceSection />
        <OfferSection />
        <FaqSection />
      </main>
      <Footer />
      <div className="h-20 md:hidden" aria-hidden="true" />
      <MobileStickyCta />
    </div>
  );
}
