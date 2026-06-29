import { Typography } from "@/components/nowts/typography";
import { SectionLayout } from "@/features/landing/section-layout";
import { Target, Salad, BarChart3, MessageCircle, Trophy, Brain } from "lucide-react";

const APPROACH_ITEMS = [
  {
    icon: Target,
    title: "100 % personnalisé",
    desc: "Chaque programme est construit autour de tes objectifs, ton niveau et ton mode de vie. Aucun PDF générique, aucune solution copier-coller.",
  },
  {
    icon: Salad,
    title: "Nutrition intégrée",
    desc: "Plan alimentaire adapté — sèche, prise de masse ou rééquilibrage — avec accompagnement sur les troubles du comportement alimentaire (TCA).",
  },
  {
    icon: BarChart3,
    title: "Suivi mensuel rigoureux",
    desc: "Bilan mensuel photo + mensurations pour mesurer chaque progression. Tu vois concrètement où tu en es et où tu vas.",
  },
  {
    icon: MessageCircle,
    title: "Communication 24h/24",
    desc: "WhatsApp & email disponibles à toute heure. Un doute sur une séance, une question nutrition à 22h — je suis là.",
  },
  {
    icon: Trophy,
    title: "Préparation compétition",
    desc: "Préparation physique et mentale aux concours fitness et compétitions. Expérience éprouvée en préparation scène.",
  },
  {
    icon: Brain,
    title: "Mental & habitudes de vie",
    desc: "La transformation passe aussi par la tête. J'intègre gestion du stress, sommeil et mental dans chaque accompagnement.",
  },
] as const;

export const Engagement = () => {
  return (
    <>
      {/* Mon engagement / Photos / Chiffres clés */}
      <SectionLayout size="lg" variant="transparent">
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="lg:pr-8">
            <Typography
              variant="h2"
              className="text-foreground text-2xl font-semibold tracking-tight text-pretty"
            >
              Mon engagement envers toi
            </Typography>
            <Typography
              variant="p"
              className="text-muted-foreground mt-6 text-base/7"
            >
              Unlcoaching est né d'une passion pour le fitness et la santé
              globale. Depuis 10 ans, j'accompagne des personnes de tous
              niveaux — débutants comme confirmés — vers leurs objectifs :
              perte de poids, prise de muscle, remise en forme ou préparation
              à la compétition.
            </Typography>
            <Typography
              variant="p"
              className="text-muted-foreground mt-8 text-base/7"
            >
              Ce qui me différencie ? Une approche 100 % personnalisée, un
              plan alimentaire adapté à tes objectifs, et un suivi mensuel
              photo + mensurations pour mesurer chaque progrès. Je suis
              disponible via WhatsApp et email à toute heure, parce que ta
              transformation ne s'arrête pas quand la séance se termine.
            </Typography>
          </div>

          {/* Photo grid */}
          <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 xl:gap-8">
              <div className="outline-border aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1">
                <img
                  alt="Jérémy Prat coach sportif"
                  src="https://www.unlcoaching.com/_next/image?url=%2Fimages%2Fjeremy2.jpg&w=1080&q=75"
                  className="block size-full object-cover"
                />
              </div>
              <div className="outline-border -mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 lg:-mt-40">
                <img
                  alt="Coaching en salle de sport"
                  src="https://www.unlcoaching.com/_next/image?url=%2Fimages%2Fcoaching.jpg&w=828&q=75"
                  className="block size-full object-cover"
                />
              </div>
              <div className="outline-border aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1">
                <img
                  alt="Compétition Fitness France"
                  src="https://www.unlcoaching.com/_next/image?url=%2Fimages%2FfitnessFrance.jpg&w=828&q=75"
                  className="block size-full object-cover"
                />
              </div>
              <div className="outline-border -mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 lg:-mt-40">
                <img
                  alt="Team Unlcoaching événement Arcachon"
                  src="https://www.unlcoaching.com/_next/image?url=%2Fimages%2FgroupArcachon.jpg&w=828&q=75"
                  className="block size-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Chiffres clés */}
          <div className="max-lg:mt-16 lg:col-span-1">
            <Typography
              variant="p"
              className="text-muted-foreground text-base/7 font-semibold"
            >
              Mes engagements en chiffres
            </Typography>
            <hr className="border-border mt-6 border-t" />
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="border-border flex flex-col gap-y-2 border-b border-dotted pb-4">
                <dt className="text-muted-foreground text-sm/6">
                  Transformations réussies
                </dt>
                <dd className="text-foreground order-first text-6xl font-semibold tracking-tight">
                  <span>350</span>+
                </dd>
              </div>
              <div className="border-border flex flex-col gap-y-2 border-b border-dotted pb-4">
                <dt className="text-muted-foreground text-sm/6">
                  Années d'expérience
                </dt>
                <dd className="text-foreground order-first text-6xl font-semibold tracking-tight">
                  <span>10</span>+
                </dd>
              </div>
              <div className="max-sm:border-border flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:pb-4">
                <dt className="text-muted-foreground text-sm/6">
                  Disponibilité
                </dt>
                <dd className="text-foreground order-first text-6xl font-semibold tracking-tight">
                  5j<span className="text-4xl">/7</span>
                </dd>
              </div>
              <div className="flex flex-col gap-y-2">
                <dt className="text-muted-foreground text-sm/6">
                  Followers Instagram
                </dt>
                <dd className="text-foreground order-first text-6xl font-semibold tracking-tight">
                  <span>3.5</span>k
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </SectionLayout>

      {/* Approche / Valeurs */}
      <SectionLayout variant="transparent">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <Typography
            variant="h2"
            className="text-foreground text-2xl font-semibold tracking-tight text-pretty"
          >
            Mon approche
          </Typography>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {APPROACH_ITEMS.map((item) => (
              <div key={item.title} className="border-border border rounded-xl p-6">
                <item.icon className="size-7 text-orange-500 mb-4" strokeWidth={1.5} />
                <Typography
                  variant="h3"
                  className="text-foreground text-base font-semibold"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="p"
                  className="text-muted-foreground mt-2 text-sm/6"
                >
                  {item.desc}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </SectionLayout>
    </>
  );
};