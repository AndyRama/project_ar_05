"use client";

import { SectionDivider } from "@/features/landing/section-divider";
import { SubHero } from "@/features/landing/sub-hero";
import { Testimonials } from "@/features/landing/testimonials";
import { FAQSection } from "@/features/landing/faq-accordion";
import { EmailFormSection } from "@/features/email/email-form-section";
import { ScrollingGallery } from "@/features/landing/scrolling-galery";
import StoryCardGrid from "@/features/landing/story-card-grid";

export default function Team() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <div className="mt-16" />

      <SubHero title="Team" />

      <SectionDivider />

      <section className="container mx-auto px-4 py-16">

				<ScrollingGallery />

				<SectionDivider />

				<StoryCardGrid />
  
        <Testimonials />

        <SectionDivider />

        <FAQSection faq={[]} />

        <SectionDivider />

        <EmailFormSection />
      </section>

    </div>
  );
}