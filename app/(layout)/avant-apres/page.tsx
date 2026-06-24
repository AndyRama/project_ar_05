import { SectionDivider } from "@/features/landing/section-divider";
import { SubHero } from "@/features/landing/sub-hero";
import { Testimonials } from "@/features/landing/testimonials";
import { EmailFormSection } from "@/features/email/email-form-section";
import StoryCardGrid from "@/features/landing/story-card-grid";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `À propos | ${SiteConfig.title}`,
  description:
    "Découvrez Jérémy Prat, coach sportif personnel et fondateur d'Unlcoaching. 10 ans d'expérience, +350 transformations réussies, programmes personnalisés perte de poids, musculation et remise en forme.",
  keywords: [
    "coach sportif personnel",
    "Jérémy Prat",
    "Unlcoaching",
    "transformation physique",
    "perte de poids",
    "prise de masse",
    "coaching en ligne",
  ],
  openGraph: {
    title: `À propos | ${SiteConfig.title}`,
    description:
      "Découvrez Jérémy Prat, coach sportif personnel et fondateur d'Unlcoaching. 10 ans d'expérience, +350 transformations réussies.",
    url: `${SiteConfig.prodUrl}/about`,
    type: "website",
  },
};

export default function BeforAfter() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* <div className="mt-16" /> */}

      <SubHero title="Ávant - Ápres" />

      <StoryCardGrid />

      {/* <Message communauté/> */}

      {/* <SubHero2/> */}

      <Testimonials />

      <SectionDivider />

      <EmailFormSection />
    </div>
  );
}
