
import { LandingHeader } from "@/features/landing/landing-header";
import { Hero } from "@/features/landing/hero";
import { ForWhoSection } from "@/features/landing/for-who-section";
import { TransformationCard } from "@/features/landing/transformation-card";
import { StoryCardGrid } from "@/features/landing/story-card-grid";
import { SectionDivider } from "@/features/landing/section-divider";
import { Testimonials } from "@/features/landing/testimonials";
import { Footer } from "@/features/layout/footer";
import { ScrollingGallery } from "@/features/landing/scrolling-galery";
import { CtaBanner } from "@/features/landing/cta-banner";
import { FAQSection } from "@/features/landing/faq-accordion";


export default function HomePage() {
  return (
    <div className="bg-background text-foreground relative flex h-fit flex-col">
      <div className="mt-16"></div>

      <LandingHeader />

      <Hero />

      <ForWhoSection />

      <TransformationCard />

      <StoryCardGrid />

      <ScrollingGallery />

      {/* <AbonnementCard/> */}

      {/* <CardGrid/> */}

      {/* <Profile/> */}

      <Testimonials />       

      <CtaBanner />

      {/* <RecentBlog/> */}

      {/* <Ebook/> */}

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
      <Footer />
    </div>
  );
}
