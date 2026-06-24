"use client";

import { SectionDivider } from "@/features/landing/section-divider";
import { SubHero } from "@/features/landing/sub-hero";
import { Offers } from "@/features/landing/offers";
import { Testimonials } from "@/features/landing/testimonials";
import { FAQSection } from "@/features/landing/faq-accordion";
import { EmailFormSection } from "@/features/email/email-form-section";
import { PricingEbook } from "@/features/prestations/pricing-section-ebook";
import { Engagement } from "@/features/prestations/engagement";

export default function Prestations() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* <div className="mt-16" /> */}

      <SubHero title="Prestations" />

      <Engagement />

      <Offers />

      <SectionDivider />
      
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

       <FAQSection 
        faq={[
          {
            question: "Qu'est-ce que unlcoaching.com ?",
            answer:
              "Unlcoaching est une plateforme dédiée au coaching sportif et au développement personnel. Elle aide les utilisateurs à atteindre leurs objectifs de santé et de bien-être grâce à des programmes de coaching personnalisés et des articles de blog informatifs.",
          },
          {
            question: "Quels services propose unlcoaching.com ?",
            answer:
              "Nous proposons une gamme de services, y compris des séances de coaching individuel, des programmes de remise en forme, et un blog regorgeant de conseils sur la nutrition, l'entraînement et le développement personnel.",
          },
          {
            question: "Comment puis-je m'inscrire à un programme de coaching ?",
            answer:
              "Vous pouvez vous inscrire à un programme en visitant notre page d'accueil et en sélectionnant l'option 'S'inscrire'. Vous serez guidé à travers un processus simple pour choisir le programme qui correspond le mieux à vos besoins.",
          },
          {
            question: "Quels sont les avantages du coaching avec unlcoaching.com ?",
            answer:
              "Le coaching avec unlcoaching.com vous permet de bénéficier de l'expertise d'un coach professionnel Jérémy Prat, d'un programme personnalisé adapté à vos objectifs, et d'un suivi continu pour garantir vos progrès.",
          },
          {
            question: "Quels sont les prix des services offerts par unlcoaching.com ?",
            answer:
              "Nous offrons plusieurs plans tarifaires adaptés à différents besoins, allant des sessions de coaching individuelles aux programmes complets sur plusieurs mois. Pour plus de détails, veuillez consulter notre page dédiée aux tarifs.",
          },
        ]}
      />

      <SectionDivider />

      <EmailFormSection />

    </div>
  );
}