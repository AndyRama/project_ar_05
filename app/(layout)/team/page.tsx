import Link from "next/link";
import { SectionDivider } from "@/features/landing/section-divider";
import { SubHero } from "@/features/landing/sub-hero";
import { Testimonials } from "@/features/landing/testimonials";
import { EmailFormSection } from "@/features/email/email-form-section";
import StoryCardGrid from "@/features/landing/story-card-grid";
import { PublicMessage } from "@/features/prestations/public-message";
import { Typography } from "@/components/nowts/typography";


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

      <PublicMessage />

      <SubHero title="" imageUrl="/images/groupArcachon.jpg" />

      <Testimonials />

      <SectionDivider />

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

      <EmailFormSection />

    </div>
  );
}
