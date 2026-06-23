import { Typography } from "@/components/nowts/typography";
import { Card } from "@/components/ui/card";
import { LogoSvg } from "@/components/svg/logo-subscribe";
import { SectionLayout } from "../landing/section-layout";
import { EmailForm } from "./email-form";

export const EmailFormSection = () => {
  return (
    <SectionLayout size="xl">
      <Card
        className="w-full relative isolate flex flex-col items-center overflow-hidden
                   bg-cover bg-center py-24 text-center shadow-2xl"
        style={{ backgroundImage: `url('/images/salle-de-sport.jpg')` }}
      >
        {/* Overlay pour la lisibilité du texte sur l'image */}
        <div className="absolute inset-0 -z-10 bg-black/60" />

        <LogoSvg className="mb-4" />

        <Typography
          variant="small"
          className="font-extrabold uppercase text-orange-500"
        >
          Rejoins la communauté
        </Typography>

        <Typography
          as="h2"
          className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          Ne manquez jamais une{" "}
          <span className="text-gradient bg-gradient-to-r from-orange-600 via-red-400 to-yellow-400 font-mono font-extrabold uppercase">
            actualité.
          </span>
        </Typography>

        <Typography className="mx-auto mt-6 max-w-lg text-center text-lg text-gray-300">
          Je partage de nombreux conseils et pratique chaque semaine dans mes articles !
        </Typography>

        <div className="mx-auto mt-10 w-full max-w-lg px-4">
          <EmailForm
            submitButtonLabel="Join"
            successMessage="Merci d'avoir rejoint la communauté !"
          />
        </div>
      </Card>
    </SectionLayout>
  );
};