import GridBackground from "@/components/nowts/grid-background";
import { Typography } from "@/components/nowts/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSupportAction } from "@/features/contact/support/contact-support.action";
import { ContactSupportSchema } from "@/features/contact/support/contact-support.schema";
import { env } from "@/lib/env";
import { serverToast } from "@/lib/server-toast";
import { SiteConfig } from "@/site-config";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contact | ${SiteConfig.title} - Coaching Sportif & Transformation Physique`,
  description:
    "Contactez Jeremy Prat, coach sportif certifié, pour un accompagnement personnalisé : perte de poids, prise de muscle, remise en forme ou préparation compétition. Réponse sous 24h.",
  keywords: [
    "contact coach sportif",
    "coaching personnalisé",
    "perte de poids Bordeaux",
    "prise de muscle",
    "remise en forme",
    "préparation compétition",
    "coach sportif Nouvelle-Aquitaine",
    "Unlcoaching",
  ],
  openGraph: {
    title: `Contact ${SiteConfig.title} - Coach Sportif Jeremy Prat`,
    description:
      "Envie de te transformer ? Contacte Jeremy Prat pour un programme de coaching sportif et nutritionnel sur mesure, adapté à tes objectifs.",
    url: `${SiteConfig.prodUrl}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-background relative isolate min-h-screen">
      <GridBackground
        size={20}
        color="color-mix(in srgb, var(--border) 30%, transparent)"
      />
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="bg-muted/10 relative flex items-center justify-end px-6 py-24 backdrop-blur-sm sm:py-32 lg:px-12">
          <div className="relative z-10 mx-auto w-full max-w-xl lg:mx-0 lg:max-w-lg">
            <Typography
              variant="h1"
              className="text-foreground text-4xl font-semibold tracking-tight text-pretty sm:text-5xl"
            >
              Parlons de votre transformation
            </Typography>
            <Typography
              variant="p"
              className="text-muted-foreground mt-6 text-lg/8"
            >
              Vous souhaitez perdre du poids, prendre du muscle, vous remettre
              en forme ou préparer une compétition ? J'analyse votre profil et
              vos objectifs pour vous proposer un programme d'entraînement et
              de nutrition réellement adapté à votre rythme de vie. Parlons-en
              ensemble.
            </Typography>
            <dl className="text-muted-foreground mt-10 flex flex-col gap-4 text-base/7">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Zone d'intervention</span>
                  <MapPin
                    aria-hidden="true"
                    className="text-muted-foreground h-6 w-6"
                  />
                </dt>
                <dd>
                  Nouvelle-Aquitaine
                  <br />
                  Bordeaux, Mérignac, Pessac, Talence et toute la région
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail
                    aria-hidden="true"
                    className="text-muted-foreground h-6 w-6"
                  />
                </dt>
                <dd>
                  
                    href={`mailto:${env.NEXT_PUBLIC_EMAIL_CONTACT}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {env.NEXT_PUBLIC_EMAIL_CONTACT}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Délai de réponse</span>
                  <MessageSquare
                    aria-hidden="true"
                    className="text-muted-foreground h-6 w-6"
                  />
                </dt>
                <dd>
                  Réponse sous 24h ouvrées
                  <br />
                  Suivi 7j/7 via WhatsApp une fois le programme démarré
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <form
          action={async (formData) => {
            "use server";

            const firstname = formData.get("first-name");
            const lastname = formData.get("last-name");
            const email = formData.get("email");
            const subject = formData.get("subject");
            const message = formData.get("message");

            const result = ContactSupportSchema.safeParse({
              firstname,
              lastname,
              email,
              subject,
              message,
            });

            if (!result.success) {
              await serverToast("Données invalides, veuillez vérifier le formulaire.", "error");
              return;
            }

            await contactSupportAction(result.data);

            await serverToast("Votre message a bien été envoyé. Nous reviendrons vers vous rapidement.", "success");
          }}
          className="flex w-full items-center justify-start px-6 pt-24 pb-24 sm:pt-32 lg:px-12 lg:pt-24"
        >
          <div className="max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <Label
                  htmlFor="first-name"
                  className="text-foreground block text-sm font-semibold"
                >
                  Prénom
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="last-name"
                  className="text-foreground block text-sm font-semibold"
                >
                  Nom
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label
                  htmlFor="email"
                  className="text-foreground block text-sm font-semibold"
                >
                  Adresse e-mail
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label
                  htmlFor="subject"
                  className="text-foreground block text-sm font-semibold"
                >
                  Objet
                </Label>
                <div className="mt-2.5">
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Ex : Programme perte de poids, prise de muscle..."
                    className="block w-full"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label
                  htmlFor="message"
                  className="text-foreground block text-sm font-semibold"
                >
                  Message
                </Label>
                <div className="mt-2.5">
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Parlez-moi de votre objectif, votre niveau actuel et vos disponibilités..."
                    className="block w-full"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                className="rounded-md px-3.5 py-2.5 text-center text-sm font-semibold"
              >
                Envoyer le message
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}