import type { Metadata } from "next";
import { SiteConfig } from "@/site-config";
import  BeforeAfterClient  from "./before-after-client";

export const metadata: Metadata = {
  title: `Avant/Apres | ${SiteConfig.title}`,
  description: "Découvrez Jérémy Prat, coach sportif personnel et fondateur d'Unlcoaching. 10 ans d'expérience, +350 transformations réussies, programmes personnalisés perte de poids, musculation et remise en forme.",
  keywords: ["coach sportif personnel", "Jérémy Prat", "Unlcoaching", "transformation physique", "perte de poids", "prise de masse", "coaching en ligne"],
  openGraph: {
    title: `Avant/Apres | ${SiteConfig.title}`,
    description: "Découvrez Jérémy Prat, coach sportif personnel et fondateur d'Unlcoaching. 10 ans d'expérience, +350 transformations réussies.",
    url: `${SiteConfig.prodUrl}/about`,
    type: "website",
  },
};

export default function BeforeAfterPage() {
  return <BeforeAfterClient />;
}