"use server";

import type { z } from "zod";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { sendEmail } from "@/lib/mail/send-email";
import MarkdownEmail from "@email/markdown.email";
import { MonthlyAuditSchema } from "./audit-form.schema";
import { revalidatePath } from "next/cache";

export async function submitMonthlyAuditAction(
  data: z.infer<typeof MonthlyAuditSchema>
) {
  // userId récupéré depuis la session, jamais depuis le client
  const user = await getRequiredUser();

  const parsed = MonthlyAuditSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Données du formulaire invalides");
  }

  const {
    age, size, weight, profession, pathology,
    hoursActivityPerWeek, stepsPerWeek, sleepHours,
    leftArm, rightArm, leftThigh, rightThigh,
    glutes, shoulders, chest, waist,
  } = parsed.data;

  try {
    await prisma.alimentaireProfile.create({
      data: {
        userId: user.id,
        age: Number(age),
        size: Number(size),
        weight: Number(weight),
        profession,
        pathology,
        hoursActivityPerWeek,
        stepsPerWeek,
        sleepHours,
        leftArm: Number(leftArm),
        rightArm: Number(rightArm),
        leftThigh: Number(leftThigh),
        rightThigh: Number(rightThigh),
        glutes: Number(glutes),
        shoulders: Number(shoulders),
        chest: Number(chest),
        waist: Number(waist),
      },
    });
  } catch (err) {
    logger.error("Échec de la création du bilan mensuel", { err, userId: user.id });
    throw new Error("Impossible d'enregistrer votre bilan, merci de réessayer.");
  }

  // Notification au coach — ne bloque pas la réponse si ça échoue
  try {
    await sendEmail({
      to: "unlcoachingpersonel@gmail.com",
      subject: `Nouveau bilan mensuel — ${user.name ?? user.email}`,
      html: MarkdownEmail({
        preview: `Nouveau bilan mensuel de ${user.name ?? user.email}`,
        markdown: `
        Nouveau bilan mensuel reçu depuis l'espace client.

        **Client**
        - Nom : ${user.name ?? "N/A"}
        - Email : ${user.email}

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
        - Tour de taille : ${waist}
        `,
      }),
      replyTo: user.email,
    });
  } catch (err) {
    logger.error("Échec de l'envoi de l'email de notification du bilan mensuel", { err, userId: user.id });
    // On ne bloque pas le succès de l'enregistrement pour un échec d'email
  }

  revalidatePath("/app/bilan");

  return { success: true };
}