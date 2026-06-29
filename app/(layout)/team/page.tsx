"use client";

import { useState } from "react";
import { SectionDivider } from "@/features/landing/section-divider";
import { SubHero } from "@/features/landing/sub-hero";
import { Testimonials } from "@/features/landing/testimonials";
import { EmailFormSection } from "@/features/email/email-form-section";
import StoryCardGrid from "@/features/landing/story-card-grid";
import { PromoModal } from "@/features/landing/promo-modal";
import { Typography } from "@/components/nowts/typography";
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
    </div>
  );
}
