import Link from "next/link";
import { Typography } from "@/components/nowts/typography";
import { SectionDivider } from "@/features/landing/section-divider";
import { SubHero } from "@/features/landing/sub-hero";
import { Testimonials } from "@/features/landing/testimonials";
import { EmailFormSection } from "@/features/email/email-form-section";
import { TransformationCard } from "@/features/landing/transformation-card";
import StoryCardGridV2 from "@/features/landing/story-card-grid-v2";

export default function BeforeAfterClient() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SubHero title="+350 Transformations réussies" eyebrow="Avant/Après" />

      <StoryCardGridV2 />

      <Testimonials />

      <section className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <Typography variant="h2" className="mb-6 text-white">
            Prêt à Transformer Votre Corps ?
          </Typography>
          <Typography variant="large" className="mb-8 text-orange-100">
            Rejoignez plus de 350 personnes qui ont déjà transformé leur vie avec mes programmes
          </Typography>
          <Link
            href="/#begin"
            className="rounded-[10px] bg-white px-12 py-4 text-xl font-bold text-orange-700 transition-all hover:scale-105 hover:bg-gray-100"
          >
            Commencer ma transformation maintenant
          </Link>
        </div>
      </section>

      <SectionDivider />
      
      <TransformationCard />

      <EmailFormSection />

    </div>
  );
}