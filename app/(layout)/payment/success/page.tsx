import GridBackground from "@/components/nowts/grid-background";
import { Typography } from "@/components/nowts/typography";
import { CheckCircle, Dumbbell, Mail } from "lucide-react";
import { AuditForm } from "@/features/landing/audit/audit-form"; 

export default function SuccessPaymentPage() {
  return (
    <div className="bg-background relative isolate min-h-screen">
      <GridBackground
        size={20}
        color="color-mix(in srgb, var(--border) 30%, transparent)"
      />
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

        {/* Gauche — texte */}
        <div className="bg-muted/10 relative flex items-center justify-end px-4 backdrop-blur-sm mt-20 md:mt-0 lg:px-6">
          <div className="relative z-10 mx-auto w-full max-w-xl lg:mx-0 lg:max-w-lg">
            <Typography
              variant="h1"
              className="text-foreground text-3xl font-semibold tracking-tight text-pretty sm:text-4xl"
            >
              🎉 Merci pour votre achat !
            </Typography>
            <Typography variant="p" className="text-muted-foreground mt-6 text-lg/8">
              Je suis ravis de vous accueillir dans mon programme exclusif
              de coaching personnel et nutrition. Remplissez ce formulaire pour
              démarrer votre transformation puis crées un compte sur l'application.
            </Typography>

            <dl className="text-muted-foreground mt-10 flex flex-col gap-6 text-base/7">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <CheckCircle className="text-orange-500 h-6 w-6 mt-0.5" />
                </dt>
                <dd>
                  <span className="text-foreground font-semibold">Consultation Personnalisée</span>
                  <br />
                  Bilan complet en visioconférence pour comprendre vos objectifs et votre mode de vie.
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <Dumbbell className="text-orange-500 h-6 w-6 mt-0.5" />
                </dt>
                <dd>
                  <span className="text-foreground font-semibold">Programme Sur Mesure</span>
                  <br />
                  Plan de coaching et de nutrition adapté à vos besoins spécifiques.
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <Mail className="text-orange-500 h-6 w-6 mt-0.5" />
                </dt>
                <dd>
                  <span className="text-foreground font-semibold">Suivi Régulier</span>
                  <br />
                  Ajustements réguliers et suivi WhatsApp à chaque étape de votre progression.
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Droite — AuditForm */}
        <div className="flex w-full items-center justify-start px-4 lg:px-6">
          <div className="w-full max-w-xl">
            <AuditForm />
          </div>
        </div>

      </div>
    </div>
  );
}