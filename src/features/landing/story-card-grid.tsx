"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

// ── Types ─────────────────────────────────────────────────────────

export type StoryCardProps = {
  alt: string;
  width: number;
  height: number;
  img: string;
  tailwindClass?: string;
} & ComponentPropsWithoutRef<"div">;

export type StoryCardGridProps = {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
};

// ── StoryCard ─────────────────────────────────────────────────────

export const StoryCard: React.FC<StoryCardProps> = ({
  alt,
  width,
  height,
  img,
  tailwindClass,
}) => (
  <div className="group relative overflow-hidden rounded-2xl ring-1 ring-border shadow-sm">
    <Image
      src={img}
      alt={alt}
      width={width}
      height={height}
      className={`${tailwindClass ?? ""} w-full object-cover object-center
                  transition-transform duration-500 group-hover:scale-105`}
    />
  </div>
);

// ── Data ──────────────────────────────────────────────────────────

const COLUMNS = [
  {
    initial: [
      { img: "/images/story1.png", alt: "Team",                  width: 1188, height: 1413, tailwindClass: "mt-10 md:mt-32 pb-10 h-full" },
      { img: "/images/story2.jpg", alt: "Woman making a plan",   width: 1188, height: 1413, tailwindClass: "pb-10" },
    ],
    hidden: [
      { img: "/images/story3.jpg", alt: "Woman making a plan",   width: 1188, height: 1413, tailwindClass: "h-full pb-10" },
    ],
  },
  {
    initial: [
      { img: "/images/story4.jpg", alt: "White curvy building",  width: 1188, height: 1413, tailwindClass: "mt-10 h-56 lg:h-96 pb-10" },
      { img: "/images/story5.jpg", alt: "White curvy building",  width: 1188, height: 1413, tailwindClass: "h-full lg:h-100 pb-10" },
    ],
    hidden: [
      { img: "/images/story6.jpg", alt: "White curvy building",  width: 1188, height: 1413, tailwindClass: "h-66 lg:h-100 pb-10" },
      { img: "/images/story7.jpg", alt: "Team meeting",          width: 1188, height: 1413, tailwindClass: "h-56 lg:h-96" },
    ],
  },
  {
    initial: [
      { img: "/images/story8.jpg", alt: "Man writing a plan",    width: 1188, height: 1413, tailwindClass: "mt-10 md:mt-32 pb-10 h-full" },
      { img: "/images/story9.jpg", alt: "Production",            width: 1188, height: 1413, tailwindClass: "pb-10 h-106" },
    ],
    hidden: [
      { img: "/images/story13.jpg", alt: "Production",           width: 1188, height: 1413, tailwindClass: "pb-10 h-full" },
    ],
  },
] as const;

// ── Main ──────────────────────────────────────────────────────────

export const StoryCardGrid: React.FC<StoryCardGridProps> = ({
  badge,
  title,
  highlight,
  description,
}) => {
  
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <GradientBackground />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

      {/* Header — rendu seulement si au moins une prop existe */}
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
            <h2 className="text-4xl font-bold tracking-tight text-balance
                          text-foreground sm:text-5xl">
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

        {/* Masonry columns */}
        <div className="flex gap-4 md:gap-6">
          {COLUMNS.map((col, colIndex) => (
            <div key={colIndex} className="flex flex-1 flex-col gap-4 md:gap-6">
              {col.initial.map((card, i) => (
                <StoryCard key={i} {...card} />
              ))}
              {showAll && col.hidden.map((card, i) => (
                <StoryCard key={`h-${i}`} {...card} />
              ))}
            </div>
          ))}
        </div>

        {/* Show more */}
        {!showAll && (
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

export default StoryCardGrid;

// ── Background ───────────────────────────────────────────────────

const GradientBackground = () => (
  <>
    <div
      aria-hidden="true"
      className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className="relative left-[calc(50%-11rem)] aspect-[1155/678]
                   w-[36.125rem] -translate-x-1/2 rotate-[30deg]
                   bg-gradient-to-tr from-orange-300/15 to-[#9089fc]/15
                   opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      />
    </div>
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10
                 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className="relative left-[calc(50%+3rem)] aspect-[1155/678]
                   w-[36.125rem] -translate-x-1/2
                   bg-gradient-to-tr from-orange-400/10 to-[#9089fc]/15
                   opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      />
    </div>
  </>
);