"use client";

import { Typography } from "@/components/nowts/typography";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Offer = {
  id: string;
  badge?: string;
  title: string;
  price: string;
  priceUnit: string;
  priceDetail?: string;       // ex: "(3 × 160€ = 480€)"
  description?: string;
  features: string[];
  strongFeatures?: string[];
  roi?: { value: string; label: string };
  cta: string;
  href: string;
  footerNote?: string;        // ex: "Engagement 3 mois"
  featured?: boolean;
};

const OFFERS: Offer[] = [
  {
    id: "starter",
    title: "STARTER - 3 MOIS",
    price: "160€",
    priceUnit: "/ Mois",
    priceDetail: "(3 × 160€ = 480€)",
    features: [
      "Pack adapté aux débutants comme confirmés.",
      "Programme personnalisé (perte de poids, musculation ou préparation physique).",
      "Accompagnement sur les troubles du comportement alimentaire (TCA).",
      "Plan alimentaire adapté à tes objectifs (sèche, prise de masse, rééquilibrage).",
      "Bilan mensuel photo + mensurations avec suivi approfondi.",
      "Communication WhatsApp & Email avec visio ou call chaque mois.",
    ],
    cta: "Je démarre le programme",
    href: "https://buy.stripe.com/14AeVfgHKce796i8ft9AA06",
    footerNote: "Engagement 3 mois",
  },
  {
    id: "premium",
    badge: "Populaire",
    title: "PREMIUM - 6 MOIS",
    price: "180€",
    priceUnit: "/ Mois",
    priceDetail: "(6 × 180€ = 1 080€)",
    features: [
      "Pack adapté aux débutants comme confirmés.",
      "Programme personnalisé (perte de poids, musculation ou préparation physique).",
      "Accompagnement sur les troubles du comportement alimentaire (TCA).",
      "Plan alimentaire adapté à tes objectifs (sèche, prise de masse, rééquilibrage).",
      "Bilan mensuel photo + mensurations avec suivi approfondi.",
      "Communication WhatsApp & Email avec visio ou call chaque mois.",
      "Accès prioritaire et suivi renforcé.",
    ],
    cta: "Je démarre le programme",
    href: "https://buy.stripe.com/dRm14p0IMdib0zM53h9AA07",
    footerNote: "Engagement 6 mois",
    featured: true,
  },
  {
    id: "competition-vip",
    title: "COMPETITION VIP - 12 MOIS",
    price: "150€",
    priceUnit: "/ Mois",
    priceDetail: "(12 × 150€ = 1 800€)",
    features: [
      "Pack le plus complet pour une transformation durable.",
      "Programme personnalisé évolutif sur 12 mois.",
      "Accompagnement sur les troubles du comportement alimentaire (TCA).",
      "Plan alimentaire adapté avec ajustements réguliers.",
      "Bilan mensuel photo + mensurations avec suivi approfondi.",
      "Communication WhatsApp & Email illimitée avec visio ou call chaque mois.",
      "Coaching VIP avec ajustements prioritaires.",
      "Meilleur rapport qualité/prix sur l'année.",
    ],
    cta: "Je m'engage sur 12 mois",
    href: "https://buy.stripe.com/6oU00l1MQdib0zMbrF9AA08",
    footerNote: "Meilleur tarif - 150€/mois",
  },
];

export const Offers = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="inline-flex items-center rounded-full
                       border border-orange-200 bg-orange-50 px-4 py-1.5
                       text-xs font-semibold tracking-widest
                       text-orange-700 uppercase
                       dark:border-orange-800/60 dark:bg-orange-950/60
                       dark:text-orange-300"
          >
            Pack Musculation / Perte de poids
          </span>

          <Typography
            variant="h2"
            className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Choisis le programme adapté à tes objectifs
          </Typography>

          <Typography
            variant="large"
            className="text-muted-foreground mt-4 text-lg text-balance"
          >
            Coaching sportif personnalisé, suivi nutritionnel et accompagnement
            sur mesure — pour des résultats durables, à ton rythme.
          </Typography>
        </div>

        {/* ── Pain points ── */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            "manque de motivation",
            "alimentation déséquilibrée",
            "objectifs jamais atteints",
            "pas de suivi personnalisé",
            "manque de temps",
          ].map((pain) => (
            <span
              key={pain}
              className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {pain}
            </span>
          ))}
        </div>

        {/* ── Cartes (grille fixe, 3 offres) ── */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <OfferCard key={offer.id} {...offer} />
          ))}
        </div>

      </div>
    </section>
  );
};

const OfferCard = ({
  badge,
  title,
  price,
  priceUnit,
  priceDetail,
  description,
  features,
  strongFeatures = [],
  roi,
  cta,
  href,
  footerNote,
  featured,
}: Offer) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col rounded-2xl",
        "overflow-visible p-4 transition-all",
        "hover:-translate-y-1 hover:shadow-md hover:shadow-black/5",
        "dark:hover:shadow-black/20",
        featured
          ? "border-2 border-orange-500/50 bg-card"
          : "border border-border bg-card"
      )}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-3 right-4">
          <span
            className={cn(
              "rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider",
              featured
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-500 dark:bg-orange-950 dark:text-orange-400"
            )}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Titre */}
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>

      {/* Prix */}
      <div className="mt-2">
        <span className="text-2xl font-bold text-foreground">{price}</span>
        <span className="ml-1 text-sm text-orange-500">{priceUnit}</span>
        {priceDetail && (
          <p className="mt-0.5 text-xs text-muted-foreground">{priceDetail}</p>
        )}
      </div>

      {description && (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      <hr className="my-3 border-border" />

      {/* Features */}
      <ul className="flex flex-col gap-2">
        {strongFeatures.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs font-medium text-foreground">
            <Check size={13} className="mt-0.5 shrink-0 text-blue-500" />
            {f}
          </li>
        ))}
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
            <Check size={13} className="mt-0.5 shrink-0 text-orange-500" />
            {f}
          </li>
        ))}
      </ul>

      {/* ROI (optionnel) */}
      {roi && (
        <div className="mt-4 rounded-xl bg-muted px-3 py-2.5">
          <p className="text-lg font-semibold text-foreground">{roi.value}</p>
          <p className="text-xs text-muted-foreground">{roi.label}</p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto pt-4">
        <Link
          href={href}
          className={cn(
            "block w-full rounded-md py-2.5 text-center",
            "text-sm font-semibold transition-all",
            featured
              ? "bg-orange-500 text-white hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/30"
              : "border border-border text-foreground hover:border-orange-500/50 hover:text-orange-500"
          )}
        >
          {cta} →
        </Link>
        {footerNote && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {footerNote}
          </p>
        )}
      </div>
    </div>
  );
};