"use server";

import type { z } from "zod";
import { sendEmail } from "@/lib/mail/send-email";
import MarkdownEmail from "@email/markdown.email";
import { AuditFormSchema, PLANS } from "./audit-form.schema";
import { logger } from "@/lib/logger";

export async function submitAuditFormAction(
  data: z.infer<typeof AuditFormSchema>
) {
  // Revalidation côté serveur — on ne fait jamais confiance au client
  const parsed = AuditFormSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Données du formulaire invalides");
  }

  const {
    plan,
    firstname,
    lastname,
    phone,
    email,
    age,
    profession,
    pathology,
    hoursActivityPerWeek,
    stepsPerWeek,
    sleepHours,
    leftArm,
    rightArm,
    glutes,
    leftThigh,
    rightThigh,
    shoulders,
    chest,
    waist,
  } = parsed.data;

  const planLabel = PLANS.find((p) => p.value === plan)?.label ?? plan;

  try {
    await sendEmail({
      to: "unlcoachingpersonel@gmail.com",
      subject: `Nouvelle demande de coaching — ${firstname} ${lastname} (${planLabel})`,
      html: MarkdownEmail({
        preview: `Nouvelle demande de coaching de ${firstname} ${lastname} — ${planLabel}`,
        markdown: `
        Nouvelle demande de coaching reçue via le formulaire.

        **Plan choisi**
        - ${planLabel}

        **Coordonnées**
        - Nom : ${firstname} ${lastname}
        - Téléphone : ${phone}
        - Email : ${email}

        **Profil & activité**
        - Âge : ${age}
        - Profession : ${profession}
        - Pathologie / maladie : ${pathology ?? "Aucune"}
        - Heures d'activité / semaine : ${hoursActivityPerWeek}
        - Pas par semaine : ${stepsPerWeek}
        - Heures de sommeil : ${sleepHours}

        **Mensurations (cm)**
        - Bras gauche : ${leftArm}
        - Bras droit : ${rightArm}
        - Fessiers : ${glutes}
        - Jambe gauche : ${leftThigh}
        - Jambe droite : ${rightThigh}
        - Épaules : ${shoulders}
        - Poitrine : ${chest}
        - Taille : ${waist}
        `,
      }),
      replyTo: email,
    });
  } catch (err) {
    logger.error("Échec de l'envoi de l'email de demande de coaching", { err });
    throw new Error("Impossible d'envoyer votre demande, merci de réessayer.");
  }

  return { success: true };
}