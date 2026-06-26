"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LandingHeader } from "@/features/landing/landing-header";
import { Hero } from "@/features/landing/hero";
import { ForWhoSection } from "@/features/landing/for-who-section";
import { TransformationCard } from "@/features/landing/transformation-card";
import { SectionDivider } from "@/features/landing/section-divider";
import { Testimonials } from "@/features/landing/testimonials";
import { Offers } from "@/features/landing/offers";
import { About } from "@/features/landing/about";
import { CardGrid  } from "@/features/landing/card-grid";
import { Footer } from "@/features/layout/footer";
import { ScrollingGallery } from "@/features/landing/scrolling-galery";
import { PromoModal } from "@/features/landing/promo-modal";
import { FAQSection } from "@/features/landing/faq-accordion";
import { Typography } from "@/components/nowts/typography";
import RecentPosts from "@/features/landing/recent-posts";
import { PricingEbook } from "@/features/prestations/pricing-section-ebook";
import { EmailFormSection } from "@/features/email/email-form-section";
// import { PromoBanner } from "@/features/landing/promo-banner";
// import { StoryCardGrid } from "@/features/landing/story-card-grid";


export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-background text-foreground relative flex h-fit flex-col">
      <div className="mt-16"></div>

      {/* <PromoBanner onOpenModal={() => setIsModalOpen(true)} /> */}

      <LandingHeader />

      <Hero />

      <About/>

      <ForWhoSection />

      <ScrollingGallery />

      <SectionDivider />

      <TransformationCard />

      <SectionDivider />

      <Offers/>

      <Testimonials />   

      <SectionDivider />

      <div className="w-full max-w-full">
        <CardGrid />
      </div>

      <SectionDivider />

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
      
      {/* Blog Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-2">
          <Typography
            variant="p"
            className="max-w-xl font-bold text-orange-500"
          >
            Recentes
          </Typography>
          <Typography variant="h2" className="max-w-xl">
            Blog
          </Typography>
        </div>
      </motion.div>

      <motion.div
        className="mt-28"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <RecentPosts />
      </motion.div>
      
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

      <EmailFormSection />
      
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
      <Footer />
    </div>
  );
}
