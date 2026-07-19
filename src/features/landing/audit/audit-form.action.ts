"use server";

import type { z } from "zod";
import { sendEmail } from "@/lib/mail/send-email";
import MarkdownEmail from "@email/markdown.email";
import { AuditFormSchema, PLANS } from "./audit-form.schema";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

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
    size,
    weight,
    profession,
    pathology,
    hoursActivityPerWeek,
    stepsPerWeek,
    sleepHours,
    leftArm,
    rightArm,
    leftThigh,
    rightThigh,
    glutes,
    shoulders,
    chest,
    waist,
  } = parsed.data;

  const planLabel = PLANS.find((p) => p.value === plan)?.label ?? plan;

  // On sauvegarde la soumission en attente de la création du compte.
  // Elle sera consommée dans le hook `create.after` de Better-Auth
  // (voir lib/auth/audit-profile-setup.ts) pour créer le bilan initial.
  try {
    await prisma.pendingAuditSubmission.create({
      data: {
        plan,
        firstname,
        lastname,
        phone,
        email,
        age,
        size,
        weight,
        profession,
        pathology,
        hoursActivityPerWeek,
        stepsPerWeek,
        sleepHours,
        leftArm,
        rightArm,
        leftThigh,
        rightThigh,
        glutes,
        shoulders,
        chest,
        waist,
      },
    });
  } catch (err) {
    logger.error("Échec de l'enregistrement de la soumission d'audit", { err });
    // On ne bloque pas l'envoi de l'email pour autant
  }

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
        - Taille : ${size} cm
        - Poids : ${weight} kg
        - Profession : ${profession}
        - Pathologie / maladie : ${pathology ?? "Aucune"}
        - Heures d'activité / semaine : ${hoursActivityPerWeek}
        - Pas par semaine : ${stepsPerWeek}
        - Heures de sommeil : ${sleepHours}

        **Mensurations (cm)**
        - Bras gauche : ${leftArm}
        - Bras droit : ${rightArm}
        - Jambe gauche : ${leftThigh}
        - Jambe droite : ${rightThigh}
        - Fessiers : ${glutes}
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