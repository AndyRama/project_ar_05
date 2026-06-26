"use client";

import { SectionDivider } from "@/features/landing/section-divider";
import { SubHero } from "@/features/landing/sub-hero";
import { Testimonials } from "@/features/landing/testimonials";
import { EmailFormSection } from "@/features/email/email-form-section";
import StoryCardGrid from "@/features/landing/story-card-grid";
// import { MessageGroup } from "@/features/landing/message-group";
// import { EmailFormSection } from "@/features/landing/sub-hero2";

export default function Team() {
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

      <SectionDivider />

      <EmailFormSection />
    </div>
  );
}
