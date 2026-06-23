import Link from "next/link";
import Image from "next/image";
import { Heart, Star, Users, BarChart2, Clock, Zap, Instagram } from "lucide-react";
import { SectionDivider } from "@/features/landing/section-divider";
import { ReviewSmall } from "@/features/landing/review/review-small";

// ── Main ─────────────────────────────────────────────────────────

export const Hero = () => {
  return (
    <div className="relative isolate flex flex-col">
      <GradientBackground />

      <div className="relative py-24 sm:py-32 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">

            {/* ── Left: text content ── */}
            <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">

              {/* Badge */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full
                              border border-orange-200 bg-orange-50 px-4 py-1.5
                              text-xs font-semibold tracking-widest text-orange-700 uppercase
                              dark:border-orange-800/60 dark:bg-orange-950/60 dark:text-orange-300">
                Coach Personnel Certifié
              </div>

              {/* Titre */}
              <h1 className="text-4xl font-bold tracking-tight text-balance
                             text-foreground sm:text-5xl lg:text-6xl lg:leading-tight">
                Jeremy Prat {" "}
                <span className="text-orange-500">
                  Coaching Personnel
                </span>
              </h1>

              {/* Sous-titre */}
              <p className="mt-6 max-w-xl text-base leading-relaxed
                            text-muted-foreground sm:text-lg">
                Allier entraînement rigoureux et nutrition équilibrée
                pour un mode de vie sain et durable.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Link
                  href="/#begin"
                  className="rounded-md bg-orange-500 px-8 py-3.5 text-sm
                             font-semibold text-white transition-all
                             hover:bg-orange-400 hover:shadow-lg
                             hover:shadow-orange-500/30 active:scale-95"
                >
                  Voir le Programme →
                </Link>
                <Link
                  href="/team"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-md border border-border
                             px-8 py-3.5 text-sm font-semibold text-foreground
                             transition-all hover:bg-muted"
                >
                  <Heart size={15} className="text-orange-500" />
                  Rejoindre la team
                </Link>
              </div>

              {/* Badges inline */}
              <div className="mt-8 hidden md:flex flex-wrap items-center justify-center gap-6
                              text-sm text-muted-foreground lg:justify-start">
                {BADGES.map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5">
                    <Icon size={14} className="text-muted-foreground/60" />
                    {label}
                  </span>
                ))}
              </div>

              {/* Reviews */}
              <div className="mt-8 hidden md:content">
                <ReviewSmall
                  stars={5}
                  avatars={[
                    "https://i.pravatar.cc/300?u=1",
                    "https://i.pravatar.cc/300?u=2",
                    "https://i.pravatar.cc/300?u=3",
                    "https://i.pravatar.cc/300?u=4",
                    "https://i.pravatar.cc/300?u=5",
                  ]}
                >
                  3 500+ followers sur Instagram
                </ReviewSmall>
              </div>
            </div>

            {/* ── Right: photo ── */}
            <div className="flex w-full shrink-0 justify-center lg:w-auto lg:justify-end">
              <div className="relative">
                {/* Halo derrière la photo */}
                <div className="absolute inset-0 -z-10 scale-110 rounded-md
                                bg-gradient-to-tr from-orange-300/30 to-purple-300/20 blur-md" />
                <Image
                  src="/images/jeremy.jpg"
                  width={420}
                  height={560}
                  className="h-auto w-full max-w-[260px] rounded-md object-cover
                             shadow-md ring-1 ring-orange-200/40
                             sm:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px]"
                  alt="Jeremy Prat – Coach Personnel"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <SectionDivider />

      {/* ── Stats bar ── */}
      <div className="hidden md:content border-t border-border bg-muted/30">
        <div className="mx-auto max-w-4xl lg:max-w-6xl px-6 py-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map(({ icon: Icon, value }) => (
              <div key={value} className="flex items-center gap-3">
                <Icon size={18} className="shrink-0 text-muted-foreground/60" />
                <span className="text-sm font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

// ── Data ─────────────────────────────────────────────────────────

function CircleIcon({ size, className }: { size?: number; className?: string }) {
  return (
    <svg width={size ?? 14} height={size ?? 14} viewBox="0 0 14 14" className={className}>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

const BADGES = [
  { icon: CircleIcon, label: "Sans engagement" },
  { icon: Star,       label: "5 étoiles clients" },
  { icon: Zap,        label: "Résultats rapides" },
] as const;

const STATS = [
  { icon: BarChart2,  value: "+350 transformations réussies" },
  { icon: Star,       value: "Avis 5 étoiles" },
  { icon: Instagram,  value: "3 500+ followers" },
  { icon: Users,      value: "Coaching personnalisé" },
] as const;

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
                   bg-gradient-to-tr from-orange-300/20 to-[#9089fc]/20
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
                   bg-gradient-to-tr from-orange-400/10 to-[#9089fc]/20
                   opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      />
    </div>
  </>
);