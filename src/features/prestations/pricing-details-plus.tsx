"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/nowts/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import {
  FaUserEdit,
  FaLightbulb,
  // FaRegCalendarCheck,
  FaHandsHelping,
} from "react-icons/fa";
import { BiNote } from "react-icons/bi";
import { MdOutlineSportsKabaddi, MdOutlineFitnessCenter } from "react-icons/md";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  bullets: string[];
  description2?: string;
}

const features: Feature[] = [
  {
    icon: FaLightbulb,
    title: "Qu'est-ce que l'unlcoaching ?",
    description:
      "Unlcoaching est un service de coaching unique, alliant entraînement physique, conseils nutritionnels et soutien mental. Notre approche personnalisée se distingue par l'attention portée à chaque individu, afin de vous aider à atteindre vos objectifs de fitness et de bien-être.",
    bullets: [
      "Nos Services de Coaching Individuel :",
      "• Coaching en ligne : Suivi hebdomadaire et interactions régulières.",
      "• Séances en personne : Disponible selon votre localisation",
      "• Programmes sur mesure : Entraînement et nutrition adaptés à vos besoins spécifiques.",
    ],
    description2:
      "Ce qui distingue Unlcoaching des méthodes traditionnelles de coaching est [explication de la différence principale]. Pour en savoir plus, consultez notre page dédiée Prestations ou contactez-nous pour une consultation personnalisée.",
  },
  // {
  //   icon: FaUserEdit,
  //   title: "Proposez-vous des services de coaching individuel ?",
  //   description: "Oui, nous proposons des services de coaching personnalisé. Nos options incluent :",
  //   bullets: [
  //     "• Coaching en ligne avec suivi hebdomadaire",
  //     "• Sessions d'entraînement en personne (selon votre localisation)",
  //     "• Plans d'entraînement et de nutrition sur mesure",
  //   ],
  //   description2: "Pour plus de détails ou pour réserver une consultation, veuillez nous contacter via notre page de contact.",
  // },
  {
    icon: MdOutlineSportsKabaddi,
    title: "Je débute dans le fitness, par où commencer ?",
    description: "Pour bien débuter dans le fitness, je vous invite à suivre ces étapes :",
    bullets: [
      "1. Définissez vos objectifs (perte de poids, gain musculaire, etc.).",
      "2. Consultez un médecin pour un bilan de santé.",
      "3. Commencez par 2-3 séances de 20-30 minutes par semaine.",
      "4. Combinez exercices cardiovasculaires et renforcement musculaire.",
      "5. Apprenez la bonne technique pour chaque exercice.",
      "6. Adoptez une alimentation équilibrée et restez hydraté.",
      "7. Écoutez votre corps et progressez graduellement.",
    ],
    description2: "N'hésitez pas à me contacter pour un coaching personnalisé.",
  },
  {
    icon: FaUserEdit,
    title: "Proposez-vous des coachings individuels ?",
    description: "Oui, je propose des coachings individuels personnalisés. Voici ce que vous devez savoir :",
    bullets: [
      "• Je propose des séances en personne et en ligne, selon votre préférence.",
      "• Mes coachings englobent l'entraînement physique, la nutrition, la préparation mentale.",
      "• Chaque programme est conçu sur mesure selon vos objectifs.",
      "• Les tarifs varient en fonction du type et de la fréquence du coaching.",
    ],
    description2:
      "Pour plus d'informations, contactez-moi via la page Contact ou par email à contact@unlcoaching.com.",
  },
  {
    icon: MdOutlineFitnessCenter,
    title: "Comment débuter si je suis débutant ?",
    description: "Pour les débutants, nous recommandons de :",
    bullets: [
      "• Consulter notre guide 'Débuter en Fitness' dans la section Blog.",
      "• Commencer par des exercices de base et augmenter progressivement l'intensité.",
      "• Établir des objectifs réalistes à court et long terme.",
      "• Considérer une consultation avec un de nos coachs pour un plan personnalisé.",
    ],
    description2: "",
  },
  {
    icon: BiNote,
    title: "Comment contacter l'équipe Unlcoaching ?",
    description: "Vous pouvez nous contacter de plusieurs façons :",
    bullets: [
      "• Par email à : contact@unlcoaching.com",
      "• Via le formulaire de contact sur notre site",
      "• Sur nos réseaux sociaux (liens en bas de page)",
    ],
    description2: "Nous nous efforçons de répondre à toutes les requêtes dans un délai de 48 heures.",
  },
  {
    icon: FaHandsHelping,
    title: "Comment s'inscrire à un programme de coaching ?",
    description: "Pour vous inscrire à un programme de coaching, suivez ces étapes :",
    bullets: [
      "1. Consultez notre page 'Programmes de Coaching' pour voir les options.",
      "2. Choisissez le programme correspondant à vos objectifs.",
      "3. Cliquez sur 'S'inscrire' et remplissez le formulaire.",
      "4. Procédez au règlement et recevez votre confirmation par email.",
      "5. Un coach vous contactera dans les 24-48 heures.",
    ],
    description2:
      "Pour toute question, contactez-nous via le formulaire en ligne ou à contact@unlcoaching.com.",
  },
];

export const PricingDetailsPlus: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [showAll, setShowAll] = useState(true);
  const displayed = showAll ? features : features.slice(0, 3);

  return (
    <section className={`relative isolate overflow-hidden py-24 sm:py-32 ${className ?? ""}`}>
      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/4 -z-10 h-64 w-56 transform-gpu blur-3xl">
        <div className="h-full w-full bg-gradient-to-tr from-orange-500 to-orange-800 opacity-30 md:opacity-50" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-1/4 right-0 -z-10 h-64 w-56 transform-gpu blur-3xl">
        <div className="h-full w-full bg-gradient-to-tr from-orange-500 to-orange-800 opacity-30 md:opacity-50" />
      </div>

      <Layout sizes="lg">
        <LayoutContent className="mx-auto px-4">

          {/* Header */}
          <div className="mb-16 flex flex-col items-center text-center">
            <Typography variant="small" className="mb-2 font-extrabold uppercase text-orange-500">
              Notre concept
            </Typography>
            <Typography variant="h2">
              <span className="text-orange-500">Unl</span>
              coaching
            </Typography>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {displayed.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1, duration: 0.5 },
                }}
                viewport={{ once: true }}
              >
                <Card className="flex h-full flex-col gap-3 rounded-md border border-border bg-card p-6 ring-1 ring-border transition-all duration-300 hover:ring-orange-500/40">

                  {/* Icon + Title */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-orange-500/10">
                      <feature.icon className="text-2xl text-orange-500" />
                    </div>
                    <Typography variant="h3" className="text-orange-500">
                      {feature.title}
                    </Typography>
                  </div>

                  <Separator className="bg-border" />

                  <Typography variant="p" className="text-foreground">
                    {feature.description}
                  </Typography>

                  {feature.bullets.length > 0 && (
                    <ul className="flex flex-col gap-1.5">
                      {feature.bullets.map((bullet, i) => (
                        <li key={i}>
                          <Typography variant="muted" className="text-muted-foreground">
                            {bullet}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  )}

                  {feature.description2 && (
                    <Typography variant="muted" className="text-muted-foreground">
                      {feature.description2}
                    </Typography>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Show more / less */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-[10px] border border-border bg-card px-8 py-3.5
                         text-sm font-semibold text-foreground transition-all
                         hover:border-orange-500 hover:bg-orange-500/10 active:scale-95"
            >
              {showAll ? "Voir moins" : "Voir plus"}
            </button>
          </div>

        </LayoutContent>
      </Layout>
    </section>
  );
};