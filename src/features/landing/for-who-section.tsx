import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronRight, XCircle, Flame, Dumbbell, Zap, Target } from "lucide-react";

// ── Main ─────────────────────────────────────────────────────────

export const ForWhoSection = () => {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <GradientBackground />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <ForWhoHeader />
        <ForWhoGrid />
        <ForWhoNotFor />
      </div>
    </section>
  );
};

// ── Header ───────────────────────────────────────────────────────

const ForWhoHeader = () => (
  <div className="mb-16 flex flex-col items-center text-center">
    {/* Badge */}
    <div className="mb-6 inline-flex items-center gap-2 rounded-full
                    border border-orange-200 bg-orange-50 px-4 py-1.5
                    text-xs font-semibold tracking-widest text-orange-700 uppercase
                    dark:border-orange-800/60 dark:bg-orange-950/60 dark:text-orange-300">
      Programmes sur-mesure
    </div>

    <h2 className="text-4xl font-bold tracking-tight text-balance
                   text-foreground sm:text-5xl">
      Tu te reconnais dans{" "}
      <span className="text-orange-500">l'un de ces profils ?</span>
    </h2>

    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
      Peu importe ton point de départ, je t'accompagne vers TES objectifs
      avec un programme taillé sur mesure.
    </p>
  </div>
);

// ── Grid ─────────────────────────────────────────────────────────

const PROFILES = [
  {
    icon: Flame,
    title: "Tu veux PERDRE DU POIDS",
    benefits: [
      "Fini les régimes restrictifs qui te font reprendre 2× plus",
      "Des résultats visibles ET durables",
      "Tu apprends à manger sans culpabiliser",
    ],
    program: "Programme Perte de poids · 3 à 6 mois",
    cta: "Je veux perdre du poids",
    link: "/#begin",
  },
  {
    icon: Dumbbell,
    title: "Tu veux PRENDRE DU MUSCLE",
    benefits: [
      "Construire un physique solide et athlétique",
      "Programme d'entraînement progressif et intelligent",
      "Nutrition optimisée pour la prise de masse",
    ],
    program: "Programme Prise de masse · 4 à 8 mois",
    cta: "Je veux me muscler",
    link: "/#begin",
  },
  {
    icon: Zap,
    title: "Tu veux te REMETTRE EN FORME",
    benefits: [
      "Retrouver ton énergie et ta mobilité",
      "Peu importe ton niveau, on commence là où tu en es",
      "Progresser à TON rythme, sans te blesser",
    ],
    program: "Programme Remise en forme · 2 à 4 mois",
    cta: "Je veux retrouver la forme",
    link: "/#begin",
  },
  {
    icon: Target,
    title: "Tu as un OBJECTIF PRÉCIS",
    benefits: [
      "Mariage, vacances, shooting photo, compétition",
      "Plan d'attaque intensif et structuré",
      "Deadline respectée, résultats garantis",
    ],
    program: "Programme Transformation Express · 6 à 12 semaines",
    cta: "J'ai une deadline",
    link: "/#begin",
  },
] as const;

const ForWhoGrid = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
    {PROFILES.map((profile) => (
      <ProfileCard key={profile.title} {...profile} />
    ))}
  </div>
);

const ProfileCard = ({
  icon: Icon,
  title,
  benefits,
  program,
  cta,
  link,
}: {
  icon: React.ElementType;
  title: string;
  benefits: readonly string[];
  program: string;
  cta: string;
  link: string;
}) => (
  <div className="group flex flex-col rounded-md border border-border
                  bg-background p-8 shadow-sm
                  transition-all duration-300
                  hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10">

    {/* Title with icon */}
    <h3 className="mb-5 flex items-center gap-3 text-xl font-bold tracking-tight text-foreground">
      <span className="inline-flex items-center justify-center rounded-lg
                       bg-orange-100 p-2
                       dark:bg-orange-950/60">
        <Icon size={20} className="text-orange-500" />
      </span>
      {title}
    </h3>

    {/* Benefits */}
    <ul className="mb-6 flex-1 space-y-3">
      {benefits.map((benefit) => (
        <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
          <ChevronRight
            size={15}
            className="mt-0.5 shrink-0 text-orange-500"
          />
          {benefit}
        </li>
      ))}
    </ul>

    {/* Program tag */}
    <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50
                    px-3 py-2 dark:border-orange-800/50 dark:bg-orange-950/40">
      <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
        {program}
      </p>
    </div>

    {/* CTA */}
    <Link
      href={link}
      className={cn(
        buttonVariants({ size: "lg", variant: "default" }),
        "w-full rounded-md bg-orange-500 font-semibold text-white",
        "transition-all hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95",
      )}
    >
      {cta} →
    </Link>
  </div>
);

// ── Not for ──────────────────────────────────────────────────────

const NOT_FOR = [
  "Tu cherches une solution magique sans fournir d'efforts",
  "Tu n'es pas prêt(e) à t'investir à 100% dans ta transformation",
  "Tu veux juste un PDF générique sans accompagnement réel",
] as const;

const ForWhoNotFor = () => (
  <div className="mt-16 rounded-md border border-border bg-muted/30 p-8">
    <h3 className="mb-5 text-xl font-bold tracking-tight text-foreground">
      ⚠️ Ce coaching <span className="text-red-500">N'EST PAS</span> pour toi si :
    </h3>

    <ul className="mb-6 space-y-3">
      {NOT_FOR.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
          <XCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
          {item}
        </li>
      ))}
    </ul>

    {/* Callout */}
    <div className="rounded-xl border border-orange-200 bg-orange-50
                    px-5 py-4 dark:border-orange-800/50 dark:bg-orange-950/40">
      <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
        💯 Je travaille uniquement avec des personnes DÉTERMINÉES
        qui veulent des résultats RÉELS et DURABLES.
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Si c'est ton cas, on va cartonner ensemble.
      </p>
    </div>
  </div>
);

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