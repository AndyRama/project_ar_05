import { Typography } from "@/components/nowts/typography";
import { Trophy, Dumbbell, Salad, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VALUES = [
  { icon: Dumbbell,  label: "Coach sportif expert" },
  { icon: Trophy,    label: "+350 transformations réussies" },
  { icon: Salad,     label: "Nutrition personnalisée" },
  { icon: CheckCircle, label: "Résultats concrets & durables" },
];

const COMMITMENTS = [
  "Je t'accompagne avec un programme 100% personnalisé, adapté à tes objectifs.",
  "Je t'intègre un plan nutrition sur mesure : sèche, prise de masse ou rééquilibrage.",
  "Je suis disponible 5j/7 via WhatsApp pour un suivi continu et motivant.",
];

export const About = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center rounded-full
                           border border-orange-200 bg-orange-50 px-4 py-1.5
                           text-xs font-semibold tracking-widest
                           text-orange-700 uppercase
                           dark:border-orange-800/60 dark:bg-orange-950/60
                           dark:text-orange-300">
            Coach sportif
          </span>

          <Typography
            variant="h2"
            className="mt-4 text-3xl font-semibold tracking-tight
                       text-balance sm:text-2xl"
          >
            Expert en transformation physique <br />
            au service de tes objectifs
          </Typography>

          <Typography
            variant="large"
            className="text-muted-foreground mt-4 text-lg text-pretty"
          >
            Entraînement rigoureux, nutrition équilibrée et suivi personnalisé — pour un mode de vie <br/> sain et durable, pas des promesses en l'air.
          </Typography>
        </div>

        {/* ── Carte principale ── */}
        <div className="mx-auto mt-16 max-w-5xl rounded-md border
                        border-border bg-card p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2
                          lg:items-start">

            {/* ── Colonne gauche — photo ── */}
            <div className="relative">
              <div className="overflow-hidden rounded-md">
                <Image
                  src="/images/jeremy2.jpg"
                  alt="Jeremy Prat"
                  width={600}
                  height={700}
                  className="h-auto w-full object-cover object-top"
                  priority
                />
              </div>
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0
                              rounded-b-xl bg-black/60 px-4 py-3
                              backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">
                  Jeremy Prat
                </p>
                <p className="text-xs text-gray-300">
                  Fondateur, Unlcoaching
                </p>
                <p className="text-xs text-gray-300">
                  Coach sportif & expert en transformation physique
                </p>
              </div>
            </div>

            {/* ── Colonne droite — texte ── */}
            <div className="flex flex-col gap-6">

              {/* Texte intro */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ma passion pour le fitness et la santé globale m'a amené à créer{" "}
                <strong className="font-semibold text-foreground">
                  Unlcoaching
                </strong>
                , une plateforme dédiée aux transformations physiques réelles. Spécialisé dans la perte de poids, la prise de muscle et la préparation aux compétitions, j'accompagne chaque client avec une méthode structurée et humaine. Aujourd'hui, plus de{" "}
                <strong className="font-semibold text-orange-500">350 transformations réussies</strong>{" "}
                plus tard, mon objectif reste le même :{" "}
                <br />
                <strong className="font-semibold text-foreground">
                  t'aider à libérer ton plein potentiel, durablement.
                </strong>
              </p>

              {/* Badges valeurs */}
              <div className="grid grid-cols-2 gap-3">
                {VALUES.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    data-testid="about-value"
                    className="flex items-center gap-2.5 rounded-md
                               border border-border bg-muted/30 px-4 py-3"
                  >
                    <Icon size={15} className="shrink-0 text-orange-500" />
                    <span className="text-xs font-medium text-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Engagement */}
              <div className="rounded-md border border-orange-500/30
                              bg-orange-500/5 px-5 py-4">
                <p className="mb-3 text-xs font-bold tracking-widest
                               text-orange-500 uppercase">
                  Mon engagement
                </p>
                <ul className="flex flex-col gap-2">
                  {COMMITMENTS.map((c) => (
                    <li
                      key={c}
                      data-testid="about-commitment"
                      className="flex items-center gap-2 text-sm
                                 text-foreground"
                    >
                      <CheckCircle
                        size={14}
                        className="shrink-0 text-orange-500"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link
                href="/prestations/#begin"
                className="inline-flex items-center gap-1.5 text-sm
                           font-semibold text-orange-500 transition-colors
                           hover:text-orange-400"
              >
                Découvrir mes programmes →
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};