"use client";

import { Typography } from "@/components/nowts/typography";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  city: string;
  color: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "Marie",
    quote:
      "Grâce au programme de Jeremy, j'ai perdu 12 kg en 4 mois tout en tonifiant mon corps. Il m'a accompagné à chaque étape, avec des conseils sur l'entraînement et l'alimentation. Je me sens enfin bien dans ma peau ! Merci Jeremy !",
    name: "Marie D.",
    role: "Coach sportif",
    company: "Unlcoaching",
    city: "Gradignan",
    color: "bg-orange-700",
  },
  {
    id: "Thomas",
    quote:
      "Le programme perte de poids de Jeremy m'a complètement transformée ! En 3 mois, j'ai non seulement atteint mes objectifs, mais j'ai aussi appris à aimer le sport. Les entraînements étaient variés et toujours adaptés à mes capacités.",
    name: "Thomas G.",
    role: "Coach sportif",
    company: "Unlcoaching",
    city: "Gradignan",
    color: "bg-teal-700",
  },
  {
    id: "Marc",
    quote:
      "Je cherchais un coach pour me remettre en forme et perdre du poids avant mon mariage, et Jeremy a été incroyable ! En seulement 3 mois, j'ai perdu 7 kg et je me sens plus forte et plus confiante que jamais. Ses conseils nutritionnels sont un vrai plus.",
    name: "Marc C.",
    role: "Coach sportif",
    company: "Unlcoaching",
    city: "Gradignan",
    color: "bg-blue-600",
  },
  {
    id: "Alexandre",
    quote:
      "Je n'avais jamais vraiment fait de sport avant, mais Jeremy a su s'adapter à mon niveau et me motiver. J'ai non seulement perdu 8 kg, mais j'ai aussi retrouvé de l'énergie et de la confiance en moi. Ses packs sont complets et très efficaces.",
    name: "Alexandre P.",
    role: "Coach sportif",
    company: "Unlcoaching",
    city: "Gradignan",
    color: "bg-green-600",
  },
  {
    id: "Sophie",
    quote:
      "Je recommande Jeremy à 100 % ! Il ne s'agit pas juste d'un coach qui donne des exercices, mais d'un vrai accompagnateur. Grâce à lui, j'ai perdu 10 kg en 5 mois et j'ai adopté de nouvelles habitudes de vie que je n'aurais jamais imaginées.",
    name: "Sophie L.",
    role: "Coach sportif",
    company: "Unlcoaching",
    city: "Gradignan",
    color: "bg-stone-600",
  },
  {
    id: "Camille",
    quote:
      "Je pensais qu'il était trop tard pour moi pour me remettre au sport, mais Jeremy m'a prouvé le contraire. J'ai perdu 5 kg en douceur et gagné en endurance. Ses packs sont bien pensés, accessibles, et il est toujours disponible pour répondre à mes questions.",
    name: "Camille M.",
    role: "Coach sportif",
    company: "Unlcoaching",
    city: "Gradignan",
    color: "bg-red-800",
  },
];

export const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const onScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-orange-700 uppercase dark:border-orange-800/60 dark:bg-orange-950/60 dark:text-orange-300">
            Avis clients
          </span>

          <Typography
            variant="h2"
            className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Ce que disent nos clients
          </Typography>

          <Typography
            variant="large"
            className="text-muted-foreground mt-4 text-lg text-pretty"
          >
            Des retours concrets de professionnels en Nouvelle Aquitaine.
          </Typography>
        </div>

        {/* ── Carousel + flèches ── */}
        <div className="relative mt-16">
          {/* Flèche gauche */}
          {canScrollLeft && (
            <button
              data-testid="scroll-left"
              onClick={() => scroll("left")}
              aria-label="Précédent"
              className="border-border bg-card absolute top-1/2 -left-4 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition-all hover:border-orange-500/50 hover:text-orange-500"
            >
              <ChevronLeft size={16} />
            </button>
          )}

          {/* Flèche droite */}
          {canScrollRight && (
            <button
              data-testid="scroll-right"
              onClick={() => scroll("right")}
              aria-label="Suivant"
              className="border-border bg-card absolute top-1/2 -right-4 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition-all hover:border-orange-500/50 hover:text-orange-500"
            >
              <ChevronRight size={16} />
            </button>
          )}

          {/* Track */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            data-testid="testimonials-carousel"
            className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        {/* <div className="mt-10 text-center">
          <Link
            href="/avis"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 transition-colors hover:text-orange-400"
          >
            Voir tous les avis →
          </Link>
        </div> */}
      </div>
    </section>
  );
};

const TestimonialCard = ({
  quote,
  name,
  role,
  company,
  city,
  color,
}: Testimonial) => {
  return (
    <div
      data-testid="testimonial-card"
      className="border-border bg-card flex w-[300px] shrink-0 flex-col justify-between rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20"
    >
      {/* Étoiles */}
      <div className="flex gap-1" data-testid="testimonial-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="fill-orange-500 text-orange-500" />
        ))}
      </div>

      {/* Quote */}
      <p
        data-testid="testimonial-quote"
        className="text-foreground mt-4 flex-1 text-sm leading-relaxed"
      >
        {quote}
      </p>

      {/* Auteur */}
      <div className="mt-6 flex items-center gap-3">
        {/* Avatar initiale */}
        <div
          data-testid="testimonial-avatar"
          className={cn(
            "flex size-9 shrink-0 items-center justify-center",
            "rounded-full text-sm font-bold text-white",
            color,
          )}
        >
          {name[0]}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-foreground text-sm font-semibold">{name}</p>
          <p className="text-muted-foreground truncate text-xs">
            {role} — {company}
          </p>
        </div>

        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          <MapPin size={11} className="shrink-0" />
          {city}
        </div>
      </div>
    </div>
  );
};
