"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/nowts/typography";
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
  alt: string;
  width: number;
  height: number;
  category: TransformationCategory[];
  duration?: string;
  weightLoss?: string;
};

export type StoryCardV2Props = {
  img: string;
  alt: string;
  width: number;
  height: number;
  tailwindClass?: string;
  duration?: string;
  weightLoss?: string;
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
  alt,
  width,
  height,
  tailwindClass,
  duration,
  weightLoss,
}) => {
  return (
    <div className={`group relative overflow-hidden rounded-md ring-1 ring-border shadow-sm ${tailwindClass ?? ""}`}>
      <Image
        src={img}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
      />
      {(duration ?? weightLoss) && (
        <div className="absolute inset-x-3 bottom-3 z-10 rounded-md bg-black/80 p-2.5 text-sm text-white backdrop-blur-sm">
          <div className="flex items-center justify-between">
            {duration && <span>⏱️ {duration}</span>}
            {weightLoss && (
              <span className="font-bold text-orange-500">{weightLoss}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Data ──────────────────────────────────────────────────────────
// Chaque bloc = 1 grande image + 2 petites images

const ALL_IMAGES: TransformationImage[] = [
  { img: "/images/story1.png",  alt: "Transformation Team",              width: 1188, height: 1413, category: ["Perte de poids"],  duration: "4 mois",  weightLoss: "-12 kg" },
  { img: "/images/story2.jpg",  alt: "Transformation coaching",          width: 1188, height: 1413, category: ["Remise en forme"], duration: "3 mois" },
  { img: "/images/story3.jpg",  alt: "Transformation No pain no gain",   width: 1188, height: 1413, category: ["Prise de masse"],  duration: "6 mois" },

  { img: "/images/story4.jpg",  alt: "Transformation fitness",           width: 1188, height: 1413, category: ["Perte de poids"],  duration: "5 mois",  weightLoss: "-8 kg" },
  { img: "/images/story5.jpg",  alt: "Transformation entrainement",      width: 1188, height: 1413, category: ["Prise de masse"],  duration: "8 mois" },
  { img: "/images/story6.jpg",  alt: "Transformation remise en forme",   width: 1188, height: 1413, category: ["Remise en forme"], duration: "4 mois" },

  { img: "/images/story7.jpg",  alt: "Préparation compétition",          width: 1188, height: 1413, category: ["Compétition"],     duration: "12 semaines" },
  { img: "/images/story8.jpg",  alt: "Transformation étirements",        width: 1188, height: 1413, category: ["Remise en forme"], duration: "3 mois" },
  { img: "/images/story9.jpg",  alt: "Transformation coaching en salle", width: 1188, height: 1413, category: ["Perte de poids"],  duration: "5 mois",  weightLoss: "-10 kg" },

  { img: "/images/story13.jpg", alt: "Transformation musculation",       width: 1188, height: 1413, category: ["Prise de masse"],  duration: "6 mois" },
];

// Nombre de blocs (chacun = 1 grande + 2 petites) visibles avant "Voir plus"
const INITIAL_BLOCKS = 2;

const CATEGORIES: TransformationCategory[] = [
  "Tous",
  "Perte de poids",
  "Prise de masse",
  "Remise en forme",
  "Compétition",
];

// Découpe un tableau plat en blocs de 3 [grande, petite, petite]
function chunkIntoBlocks(images: TransformationImage[]) {
  const blocks: TransformationImage[][] = [];
  for (let i = 0; i < images.length; i += 3) {
    blocks.push(images.slice(i, i + 3));
  }
  return blocks;
}

// ── Main ──────────────────────────────────────────────────────────

export const StoryCardGridV2: React.FC<StoryCardGridV2Props> = ({
  badge,
  title,
  highlight,
  description,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<TransformationCategory>("Tous");

  // Filtrer
  const filtered =
    activeCategory === "Tous"
      ? ALL_IMAGES
      : ALL_IMAGES.filter((t) => t.category.includes(activeCategory));

  // Découper en blocs de 3 (1 grande + 2 petites)
  const allBlocks = chunkIntoBlocks(filtered);
  const visibleBlocks = showAll ? allBlocks : allBlocks.slice(0, INITIAL_BLOCKS);

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <GradientBackground />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        {(badge ?? title ?? highlight ?? description) && (
          <div className="mb-16 flex flex-col items-center text-center">
            {badge && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full
                              border border-orange-200 bg-orange-50 px-4 py-1.5
                              text-xs font-semibold tracking-widest text-orange-700 uppercase
                              dark:border-orange-800/60 dark:bg-orange-950/60 dark:text-orange-300">
                {badge}
              </div>
            )}
            {(title ?? highlight) && (
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

        {/* Stats + étoiles */}
        <div className="mb-10 grid grid-cols-3 gap-4 rounded-md border border-border bg-card/50 px-6 py-8 text-center backdrop-blur-sm">
          <div>
            <p className="text-2xl font-bold text-orange-500">+350</p>
            <p className="mt-1 text-xs text-muted-foreground">Transformations réussies</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1">
              <p className="text-2xl font-bold text-orange-500">5</p>
              <span className="text-xl">⭐</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Satisfaction client</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-500">10 ans</p>
            <p className="mt-1 text-xs text-muted-foreground">D&apos;expérience</p>
          </div>
        </div>

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
          <div className="flex flex-col gap-4 md:gap-6">
            {visibleBlocks.map((block, blockIndex) => {
              const [large, small1, small2] = block;
              // Alterne le côté de la grande image : gauche sur les blocs pairs, droite sur les impairs
              const largeOnLeft = blockIndex % 2 === 0;

              const largeCard = large && (
                <StoryCardV2
                  img={large.img}
                  alt={large.alt}
                  width={large.width}
                  height={large.height}
                  tailwindClass="h-[300px] md:h-[520px]"
                  duration={large.duration}
                  weightLoss={large.weightLoss}
                />
              );

              const smallStack = (small1 || small2) && (
                <div className="flex flex-1 flex-col gap-4 md:gap-6">
                  {small1 && (
                    <StoryCardV2
                      img={small1.img}
                      alt={small1.alt}
                      width={small1.width}
                      height={small1.height}
                      tailwindClass="h-[240px] md:h-[250px]"
                      duration={small1.duration}
                      weightLoss={small1.weightLoss}
                    />
                  )}
                  {small2 && (
                    <StoryCardV2
                      img={small2.img}
                      alt={small2.alt}
                      width={small2.width}
                      height={small2.height}
                      tailwindClass="h-[240px] md:h-[250px]"
                      duration={small2.duration}
                      weightLoss={small2.weightLoss}
                    />
                  )}
                </div>
              );

              return (
                <div key={blockIndex} className="flex gap-4 md:gap-6">
                  {largeOnLeft ? (
                    <>
                      <div className="flex-1">{largeCard}</div>
                      {smallStack}
                    </>
                  ) : (
                    <>
                      {smallStack}
                      <div className="flex-1">{largeCard}</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Voir plus */}
        {!showAll && allBlocks.length > INITIAL_BLOCKS && (
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