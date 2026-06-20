import { Typography } from "@/components/nowts/typography";
import { Card } from "@/components/ui/card";
import { LogoSvg } from "@/components/svg/logo-subscribe";
import { SectionLayout } from "../landing/section-layout";
import { EmailForm } from "./email-form";

export const EmailFormSection = () => {
  return (
    <SectionLayout>
      <Card
        className="relative isolate flex flex-col items-center overflow-hidden
                   bg-cover bg-center py-24 text-center shadow-2xl lg:rounded-3xl"
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

        {/* Radial gradient décoratif */}
        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
        >
          <circle
            r={512}
            cx={512}
            cy={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#EA580C" />
              <stop offset={1} stopColor="#F59E0B" />
            </radialGradient>
          </defs>
        </svg>
      </Card>
    </SectionLayout>
  );
};