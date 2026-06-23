"use client";

import { SectionDivider } from "@/features/landing/section-divider";
import { SubHero } from "@/features/landing/sub-hero";
import { Offers } from "@/features/landing/offers";
import { Testimonials } from "@/features/landing/testimonials";
import { FAQSection } from "@/features/landing/faq-accordion";
import { EmailFormSection } from "@/features/email/email-form-section";
import { PricingEbook } from "@/features/prestations/pricing-section-ebook";

export default function Prestation() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <div className="mt-16" />

      <SubHero title="Prestations" />

      <SectionDivider />

      <section className="container mx-auto px-4 py-16">
        <Offers />

        <SectionDivider />
        
        {/* Pricing Ebook */}
        <PricingEbook
          cards={[
            {
              isPopular: false,
              type: "monthly",
              id: "premium",
              title: "Ebook 1",
              subtitle: "Savoir gérer les TCA",
              price: "Free",
              barredPrice: 0,
              currency: "€",
              features: [
                "Téléchargez votre guide complet pour adopter une alimentation saine et performante, spécialement conçu pour vous accompagnez en musculation",
              ],
              cta: "Télécharger",
              ctaSubtitle: "",
              priceId: "",
              link: "/pdf/E-bookFree.pdf",
            },
            {
              isPopular: true,
              type: "monthly",
              id: "premium",
              title: "Ebook 2",
              subtitle: "Nutrition complète",
              price: "Free",
              barredPrice: 0,
              currency: "€",
              features: [
                "Nourris ton corps comme tu entraînes ton mental — avec intention, constance et ambition."
              ],
              cta: "Télécharger",
              ctaSubtitle: "",
              priceId: "",
              link: "/pdf/Guide_Nutrition_Complet.pdf",
            },
            {
              isPopular: false,
              type: "monthly",
              id: "premium",
              title: "Ebook 3",
              subtitle: "Esprit & mental",
              price: "Free",
              barredPrice: 0,
              currency: "€",
              features: [
                "Découvrez des techniques et conseils pour renforcer votre mental et optimiser vos performances, essentiels pour atteindre vos objectifs.",
              ],
              cta: "Télécharger",
              ctaSubtitle: "",
              priceId: "",
              link: "#",
            },
          ]}
        />


        <SectionDivider />

        <Testimonials />

        <SectionDivider />

        <FAQSection faq={[]} />

        <SectionDivider />

        <EmailFormSection />
      </section>

    </div>
  );
}