"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { FileQuestion } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────

type TransformationCategory =
  | "Tous"
  | "Perte de poids"
  | "Prise de masse"
  | "Remise en forme"
  | "Compétition";

type TransformationImage = {
  img: string;
  imgAfter: string;
  alt: string;
  width: number;
  height: number;
  tailwindClass?: string;
  category: TransformationCategory[];
  duration?: string;
  weightLoss?: string;
};

export type StoryCardV2Props = {
  img: string;
  imgAfter: string;
  alt: string;
  width: number;
  height: number;
  tailwindClass?: string;
  index?: number;
};

export type StoryCardGridV2Props = {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
};

// ── StoryCard ─────────────────────────────────────────────────────

export const StoryCardV2: React.FC<StoryCardV2Props> = ({
  img,
  imgAfter,
  alt,
  width,
  height,
  tailwindClass,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl ring-1 ring-border shadow-sm cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={hovered ? imgAfter : img}
        alt={alt}
        width={width}
        height={height}
        className={`${tailwindClass ?? ""} w-full object-cover object-center
                    transition-all duration-500 group-hover:scale-105`}
      />
      {/* Label Avant/Après */}
      <div className="absolute bottom-3 left-3 flex gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold transition-all ${!hovered ? "bg-white text-black" : "bg-white/30 text-white/60"}`}>
          Avant
        </span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold transition-all ${hovered ? "bg-orange-500 text-white" : "bg-orange-500/30 text-white/60"}`}>
          Après
        </span>
      </div>
    </div>
  );
};

// ── Data ──────────────────────────────────────────────────────────

const COLUMNS: { initial: TransformationImage[]; hidden: TransformationImage[] }[] = [
  {
    initial: [
      { img: "/images/story1.png",  imgAfter: "/images/story1.png",  alt: "Transformation Team",             width: 1188, height: 1413, tailwindClass: "mt-10 md:mt-32 pb-10 h-full", category: ["Perte de poids"],  duration: "4 mois",  weightLoss: "-12 kg" },
      { img: "/images/story2.jpg",  imgAfter: "/images/story2.jpg",  alt: "Transformation coaching",         width: 1188, height: 1413, tailwindClass: "pb-10",                         category: ["Remise en forme"], duration: "3 mois" },
    ],
    hidden: [
      { img: "/images/story3.jpg",  imgAfter: "/images/story3.jpg",  alt: "Transformation No pain no gain",  width: 1188, height: 1413, tailwindClass: "h-full pb-10",                  category: ["Prise de masse"],  duration: "6 mois" },
    ],
  },
  {
    initial: [
      { img: "/images/story4.jpg",  imgAfter: "/images/story4.jpg",  alt: "Transformation fitness",          width: 1188, height: 1413, tailwindClass: "mt-10 h-56 lg:h-96 pb-10",     category: ["Perte de poids"],  duration: "5 mois",  weightLoss: "-8 kg" },
      { img: "/images/story5.jpg",  imgAfter: "/images/story5.jpg",  alt: "Transformation entrainement",     width: 1188, height: 1413, tailwindClass: "h-full lg:h-100 pb-10",         category: ["Prise de masse"],  duration: "8 mois" },
    ],
    hidden: [
      { img: "/images/story6.jpg",  imgAfter: "/images/story6.jpg",  alt: "Transformation remise en forme",  width: 1188, height: 1413, tailwindClass: "h-66 lg:h-100 pb-10",           category: ["Remise en forme"], duration: "4 mois" },
      { img: "/images/story7.jpg",  imgAfter: "/images/story7.jpg",  alt: "Préparation compétition",         width: 1188, height: 1413, tailwindClass: "h-56 lg:h-96",                  category: ["Compétition"],     duration: "12 semaines" },
    ],
  },
  {
    initial: [
      { img: "/images/story8.jpg",  imgAfter: "/images/story8.jpg",  alt: "Transformation étirements",       width: 1188, height: 1413, tailwindClass: "mt-10 md:mt-32 pb-10 h-full",  category: ["Remise en forme"], duration: "3 mois" },
      { img: "/images/story9.jpg",  imgAfter: "/images/story9.jpg",  alt: "Transformation coaching en salle",width: 1188, height: 1413, tailwindClass: "pb-10 h-106",                   category: ["Perte de poids"],  duration: "5 mois",  weightLoss: "-10 kg" },
    ],
    hidden: [
      { img: "/images/story13.jpg", imgAfter: "/images/story13.jpg", alt: "Transformation musculation",      width: 1188, height: 1413, tailwindClass: "pb-10 h-full",                  category: ["Prise de masse"],  duration: "6 mois" },
    ],
  },
];

const CATEGORIES: TransformationCategory[] = [
  "Tous",
  "Perte de poids",
  "Prise de masse",
  "Remise en forme",
  "Compétition",
];

// ── Main ──────────────────────────────────────────────────────────

export const StoryCardGridV2: React.FC<StoryCardGridV2Props> = ({
  badge,
  title,
  highlight,
  description,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<TransformationCategory>("Tous");

  // Flatten toutes les images selon showAll
  const allImages: TransformationImage[] = COLUMNS.flatMap((col) =>
    showAll ? [...col.initial, ...col.hidden] : col.initial
  );

  // Filtrer
  const filtered =
    activeCategory === "Tous"
      ? allImages
      : allImages.filter((t) => t.category.includes(activeCategory));

  // Répartir en 3 colonnes
  const columns: [TransformationImage[], TransformationImage[], TransformationImage[]] = [[], [], []];
  filtered.forEach((item, i) => columns[i % 3].push(item));

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <GradientBackground />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        {(badge || title || highlight || description) && (
          <div className="mb-16 flex flex-col items-center text-center">
            {badge && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full
                              border border-orange-200 bg-orange-50 px-4 py-1.5
                              text-xs font-semibold tracking-widest text-orange-700 uppercase
                              dark:border-orange-800/60 dark:bg-orange-950/60 dark:text-orange-300">
                {badge}
              </div>
            )}
            {(title || highlight) && (
              <h2 className="text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl">
                {title}{title && highlight ? " " : ""}
                {highlight && <span className="text-orange-500">{highlight}</span>}
              </h2>
            )}
            {description && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Filtres */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              className="cursor-pointer px-5 py-2 text-sm transition-all hover:scale-105 hover:bg-orange-500 hover:text-white"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Compteur */}
        {activeCategory !== "Tous" && (
          <p className="mb-6 text-center text-sm text-muted-foreground">
            <span className="text-orange-500 font-semibold">{filtered.length}</span>{" "}
            {filtered.length > 1 ? "transformations" : "transformation"} — {activeCategory}
          </p>
        )}

        {/* Grille ou empty state */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex flex-col items-center rounded-lg border-2 border-dashed p-8 gap-4">
              <FileQuestion size={48} className="text-muted-foreground" />
              <Typography variant="h2">Aucune transformation trouvée</Typography>
              <Typography variant="muted">
                Aucune transformation ne correspond à : {activeCategory}
              </Typography>
              <Button variant="link" onClick={() => setActiveCategory("Tous")} className="text-orange-500">
                Voir toutes les transformations
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 md:gap-6">
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="flex flex-1 flex-col gap-4 md:gap-6">
                {col.map((card, i) => (
                  <div key={i} className="relative">
                    <StoryCardV2
                      img={card.img}
                      imgAfter={card.imgAfter}
                      alt={card.alt}
                      width={card.width}
                      height={card.height}
                      tailwindClass={card.tailwindClass}
                    />
                    {(card.duration || card.weightLoss) && (
                      <div className="absolute inset-x-3 bottom-10 z-10 rounded-lg bg-black/80 p-2.5 text-sm text-white backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          {card.duration && <span>⏱️ {card.duration}</span>}
                          {card.weightLoss && (
                            <span className="font-bold text-orange-500">{card.weightLoss}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Voir plus */}
        {!showAll && filtered.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-md border border-border px-8 py-3.5 text-sm
                         font-semibold text-foreground transition-all
                         hover:bg-muted active:scale-95"
            >
              Voir plus de transformations
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default StoryCardGridV2;

// ── Background ────────────────────────────────────────────────────

const GradientBackground = () => (
  <>
    <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
      <div
        style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-300/15 to-[#9089fc]/15 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      />
    </div>
    <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
      <div
        style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-orange-400/10 to-[#9089fc]/15 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      />
    </div>
  </>
);