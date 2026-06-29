"use client";

import { useState } from "react";
import { SectionDivider } from "@/features/landing/section-divider";
import { SubHero } from "@/features/landing/sub-hero";
import { Testimonials } from "@/features/landing/testimonials";
import { EmailFormSection } from "@/features/email/email-form-section";
import StoryCardGrid from "@/features/landing/story-card-grid";
import { PromoModal } from "@/features/landing/promo-modal";
import { Typography } from "@/components/nowts/typography";
import { FAQSection } from "@/features/landing/faq-accordion";
// import { MessageGroup } from "@/features/landing/message-group";
// import { EmailFormSection } from "@/features/landing/sub-hero2";

export default function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* <div className="mt-16" /> */}

      <SubHero title="Le Coeur de la team" eyebrow="Nos valeurs" />

      <StoryCardGrid
        badge="Example de résultats"
        title="Avant /"
        highlight="Après"
        description="Des transformations réelles, obtenues avec un programme sur mesure et un suivi rigoureux."
      />

      {/* <MessageGroup/> */}

      {/* <SubHero2/> */}

      <Testimonials />

      <SubHero title="" imageUrl="/images/groupArcachon.jpg'" />

      <SectionDivider />

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <Typography variant="h2" className="mb-6 text-white">
            Prêt à Transformer Votre Corps ?
          </Typography>
          <Typography variant="large" className="mb-8 text-orange-100">
            Rejoignez plus de 350 personnes qui ont déjà transformé leur vie
            avec mes programmes
          </Typography>
          <div className="mb-8 inline-block rounded-md bg-white/10 p-6 backdrop-blur-sm">
            <p className="font-semibold text-white">
              ⏰ Offre limitée : -50€ sur les programmes prémium et compétition ! 
            </p>
            <p className="text-orange-100">Ne manquez pas cette opportunité !</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-[10px] bg-white px-12 py-4 text-xl font-bold text-orange-700 transition-all hover:scale-105 hover:bg-gray-100"
          >
            Commencer ma transformation maintenant
          </button>
        </div>
      </section>

      {/* Modal */}
      <PromoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <SectionDivider />

      <EmailFormSection />

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
    </div>
  );
}
