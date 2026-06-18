import Link from "next/link";
import { BarChart2, Clock, Zap, User } from "lucide-react";
import { SectionDivider } from "@/features/landing/section-divider";

export const Hero = () => {
  return (
    <div className="relative isolate flex flex-col">
      <GradientBackground />

      <div className="relative py-24 sm:py-32 lg:pb-20">
        <div className="mx-auto max-w-8xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">

            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full
                            border border-orange-200 bg-orange-50 px-4 py-1.5
                            text-xs font-semibold tracking-widest
                            text-orange-700 uppercase
                            dark:border-orange-800/60 dark:bg-orange-950/60
                            dark:text-orange-300">
              Appel gratuit
            </div>

            {/* Titre */}
            <h1 className="text-4xl font-bold tracking-tight text-balance
                           text-foreground sm:text-5xl lg:text-6xl
                           lg:leading-tight">
              Vous cherchez à intégrer de l'I.A <br/> {" "}
              <span className="text-orange-500">
                Mais vous ne savez pas par où commencer ?
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed
                          text-muted-foreground sm:text-lg">
              En 30 minutes, on identifie exactement quels process de votre business
              peuvent être automatisés avec l'I.A — et combien ça vous ferait gagner.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center
                            justify-center gap-4">
              <Link
                href="#audit-form"
                className="rounded-md bg-orange-500 px-8 py-3.5 text-sm
                           font-semibold text-white transition-all
                           hover:bg-orange-400 hover:shadow-lg
                           hover:shadow-orange-500/30 active:scale-95"
              >
                Prendre rendez-vous →
              </Link>
              <Link
                href="/realisations"
                className="rounded-md border border-border px-8 py-3.5
                           text-sm font-semibold text-foreground
                           transition-all hover:bg-muted"
              >
                Voir mes réalisations
              </Link>
            </div>

            {/* Badges inline */}
            <div className="mt-8 flex flex-wrap items-center
                            justify-center gap-6 text-sm
                            text-muted-foreground">
              {BADGES.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <Icon size={14} className="text-muted-foreground/60" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <SectionDivider />

      {/* ── Stats bar ── */}
      <div className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map(({ icon: Icon, value }) => (
              <div key={value} className="flex items-center gap-3">
                <Icon size={18} className="shrink-0 text-muted-foreground/60" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

// ── Data ────────────────────────────────────────────────────────

function CircleIcon({ size, className }: { size?: number; className?: string }) {
  return (
    <svg width={size ?? 14} height={size ?? 14} viewBox="0 0 14 14" className={className}>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

const BADGES = [
  { icon: CircleIcon, label: "Sans engagement" },
  { icon: Clock,      label: "Appel de 30 min" },
  { icon: Zap,        label: "Résultats rapides" },
] as const;

const STATS = [
  { icon: BarChart2, value: "+20 audits I.A. réalisés", label: "" },
  { icon: Clock,     value: "Réponse < 24h",            label: "" },
  { icon: Zap,       value: "Automatisation rapide",    label: "" },
  { icon: User,     value: "Orienté Zero Employé",     label: "" },
] as const;

// ── Background ───────────────────────────────────────────────────

const GradientBackground = () => (
  <>
    <div
      aria-hidden="true"
      className="absolute inset-x-0 -top-40 -z-10 transform-gpu
                 overflow-hidden blur-3xl sm:-top-80"
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className="relative left-[calc(50%-11rem)] aspect-[1155/678]
                   w-[36.125rem] -translate-x-1/2 rotate-[30deg]
                   bg-gradient-to-tr from-orange-300/20 to-[#9089fc]/20
                   opacity-30 sm:left-[calc(50%-30rem)]
                   sm:w-[72.1875rem]"
      />
    </div>
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10
                 transform-gpu overflow-hidden blur-3xl
                 sm:top-[calc(100%-30rem)]"
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className="relative left-[calc(50%+3rem)] aspect-[1155/678]
                   w-[36.125rem] -translate-x-1/2
                   bg-gradient-to-tr from-orange-400/10 to-[#9089fc]/20
                   opacity-20 sm:left-[calc(50%+36rem)]
                   sm:w-[72.1875rem]"
      />
    </div>
  </>
);