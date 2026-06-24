import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────

const FEATURES = [
  "Un accompagnement mensuel sur mesure avec un coach disponible et inspirant",
  "Une communication 7j/7 24h/24 via WhatsApp",
  "10 ans d'expérience qui te permettront sur le long terme de révéler ton plein potentiel",
  "Une planification 100% personnalisée accompagnée d'un plan nutrition et d'une programmation sportive qui répondront à tes attentes",
] as const;

const IMAGES = [
  { src: "/images/kelly.jpg",   alt: "Kelly – transformation" },
  { src: "/images/justine.jpg", alt: "Justine – transformation" },
  { src: "/images/david.jpg",   alt: "David – transformation" },
  { src: "/images/mamie.jpg",   alt: "Transformation – résultat" },
] as const;

// ── Main ─────────────────────────────────────────────────────────

export function TransformationCard() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <GradientBackground />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 lg:gap-20">

          {/* ── Left: content ── */}
          <div className="flex flex-col gap-8">

            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full
                            border border-orange-200 bg-orange-50 px-4 py-1.5
                            text-xs font-semibold tracking-widest text-orange-700 uppercase
                            dark:border-orange-800/60 dark:bg-orange-950/60 dark:text-orange-300">
              Coaching personnalisé
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold tracking-tight text-balance
                           text-foreground sm:text-4xl lg:text-5xl lg:leading-tight">
              Libère ton plein potentiel accompagné par l'équipe{" "}
              <span className="text-orange-500">d'Unlcoaching</span>
            </h2>

            {/* Features */}
            <ul className="space-y-4">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center
                                   rounded-full bg-orange-500">
                    <svg className="size-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {feature}
                  </p>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div>
              <Link
                href="/#begin"
                className="inline-flex items-center gap-1 rounded-md bg-orange-500
                           px-8 py-3.5 text-sm font-semibold text-white
                           transition-all hover:bg-orange-400 hover:shadow-lg
                           hover:shadow-orange-500/30 active:scale-95"
              >
                Commencer ma transformation
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* ── Right: image grid ── */}
          <div className="relative">
            {/* Halo */}
            <div className="absolute inset-0 -z-10 scale-105 rounded-3xl
                            bg-gradient-to-tr from-orange-300/20 to-purple-300/10 blur-2xl" />

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {IMAGES.map(({ src, alt }) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-md
                             ring-1 ring-border shadow-sm"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

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