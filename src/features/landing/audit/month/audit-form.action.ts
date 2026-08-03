"use server";

import type { z } from "zod";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { sendEmail } from "@/lib/mail/send-email";
import MarkdownEmail from "@email/markdown.email";
import { MonthlyAuditSchema } from "./audit-form.schema";
import { revalidatePath } from "next/cache";

function buildData(parsed: z.infer<typeof MonthlyAuditSchema>) {
  return {
    age: Number(parsed.age),
    size: Number(parsed.size),
    weight: Number(parsed.weight),
    gender: parsed.gender ?? null,
    profession: parsed.profession,
    pathology: parsed.pathology ?? null,
    hoursActivityPerWeek: parsed.hoursActivityPerWeek,
    stepsPerWeek: parsed.stepsPerWeek,
    sleepHours: parsed.sleepHours,
    leftArm: Number(parsed.leftArm),
    rightArm: Number(parsed.rightArm),
    leftThigh: Number(parsed.leftThigh),
    rightThigh: Number(parsed.rightThigh),
    glutes: Number(parsed.glutes),
    shoulders: Number(parsed.shoulders),
    chest: Number(parsed.chest),
    waist: Number(parsed.waist),
    back: Number(parsed.back),
    hips: Number(parsed.hips),
    leftForearm: Number(parsed.leftForearm),
    rightForearm: Number(parsed.rightForearm),
    leftCalf: Number(parsed.leftCalf),
    rightCalf: Number(parsed.rightCalf),
    bodyFatPercentage: parsed.bodyFatPercentage ? Number(parsed.bodyFatPercentage) : null,
    sleepQuality: parsed.sleepQuality ?? null,
    mealsPerDay: parsed.mealsPerDay ? Number(parsed.mealsPerDay) : null,
    hydrationLiters: parsed.hydrationLiters ? Number(parsed.hydrationLiters) : null,
    dietCompliance: parsed.dietCompliance ?? null,
    supplements: parsed.supplements ?? null,
    stressLevel: parsed.stressLevel ?? null,
    stressComment: parsed.stressComment ?? null,
    trainingSessionsPerWeek: parsed.trainingSessionsPerWeek ? Number(parsed.trainingSessionsPerWeek) : null,
    avgSessionDuration: parsed.avgSessionDuration ? Number(parsed.avgSessionDuration) : null,
    trainingIntensity: parsed.trainingIntensity ?? null,
    monthlyFocus: parsed.monthlyFocus ?? null,
    monthlyProgress: parsed.monthlyProgress ?? null,
    pointsToImprove: parsed.pointsToImprove ?? null,
    energyLevel: parsed.energyLevel ?? null,
    motivationLevel: parsed.motivationLevel ?? null,
    recoveryLevel: parsed.recoveryLevel ?? null,
    monthlyObservations: parsed.monthlyObservations ?? null,
    nextMonthGoals: parsed.nextMonthGoals ?? null,
  };
}

export async function submitMonthlyAuditAction(
  data: z.infer<typeof MonthlyAuditSchema>
) {
  const user = await getRequiredUser();

  const parsed = MonthlyAuditSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Données du formulaire invalides");
  }

  try {
    await prisma.alimentaireProfile.create({
      data: {
        userId: user.id,
        ...buildData(parsed.data),
      },
    });
  } catch (err) {
    logger.error("Échec de la création du bilan mensuel", { err, userId: user.id });
    throw new Error("Impossible d'enregistrer votre bilan, merci de réessayer.");
  }

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

        **Profil**
        - Âge : ${parsed.data.age}
        - Taille : ${parsed.data.size} cm
        - Poids : ${parsed.data.weight} kg
        - Masse grasse : ${parsed.data.bodyFatPercentage ?? "Non mesurée"}%
        `,
      }),
      replyTo: user.email,
    });
  } catch (err) {
    logger.error("Échec de l'envoi de l'email de notification", { err, userId: user.id });
  }

  revalidatePath("/app/bilan");

  return { success: true };
}

export async function updateMonthlyAuditAction(
  profileId: string,
  data: z.infer<typeof MonthlyAuditSchema>
) {
  const user = await getRequiredUser();

  const existing = await prisma.alimentaireProfile.findUnique({
    where: { id: profileId },
  });

  if (!existing || existing.userId !== user.id) {
    throw new Error("Bilan introuvable");
  }

  const parsed = MonthlyAuditSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Données du formulaire invalides");
  }

  try {
    await prisma.alimentaireProfile.update({
      where: { id: profileId },
      data: buildData(parsed.data),
    });
  } catch (err) {
    logger.error("Échec de la mise à jour du bilan", { err, userId: user.id, profileId });
    throw new Error("Impossible de mettre à jour le bilan, merci de réessayer.");
  }

  revalidatePath("/app/bilan");

  return { success: true };
}