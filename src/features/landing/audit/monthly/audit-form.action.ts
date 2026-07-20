"use server";

import type { z } from "zod";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
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

  revalidatePath("/app/bilans"); 

  return { success: true };
}