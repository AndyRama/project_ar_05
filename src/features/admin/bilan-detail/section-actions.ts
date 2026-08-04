"use server";

import type { z, ZodType } from "zod";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { revalidatePath } from "next/cache";
import {
  MeasurementsSchema,
  LifestyleSchema,
  TrainingSchema,
  QualitativeSchema,
} from "./schemas";

// Convertit les strings numériques en number, laisse le reste tel quel,
// transforme "" en null pour les champs optionnels
function coerce<T extends Record<string, unknown>>(data: T): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === "" || value === undefined) {
      out[key] = null;
    } else if (typeof value === "string" && !isNaN(Number(value)) && value.trim() !== "") {
      out[key] = Number(value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

async function updateSection<S extends ZodType>(
  schema: S,
  profileId: string,
  data: z.infer<S>,
  revalidatePaths: string[]
) {
  const user = await getRequiredUser();

  const existing = await prisma.alimentaireProfile.findUnique({ where: { id: profileId } });
  if (!existing || existing.userId !== user.id) {
    throw new Error("Bilan introuvable");
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Données invalides");
  }

  try {
    await prisma.alimentaireProfile.update({
      where: { id: profileId },
      data: coerce(parsed.data as Record<string, unknown>),
    });
  } catch (err) {
    logger.error("Échec de la mise à jour de section", { err, userId: user.id, profileId });
    throw new Error("Impossible d'enregistrer, merci de réessayer.");
  }

  for (const path of revalidatePaths) revalidatePath(path);

  return { success: true };
}

export async function updateMeasurementsAction(profileId: string, data: z.infer<typeof MeasurementsSchema>) {
  return updateSection(MeasurementsSchema, profileId, data, ["/app/bilan", `/app/bilan/${profileId}`]);
}

export async function updateLifestyleAction(profileId: string, data: z.infer<typeof LifestyleSchema>) {
  return updateSection(LifestyleSchema, profileId, data, ["/app/bilan", `/app/bilan/${profileId}`]);
}

export async function updateTrainingAction(profileId: string, data: z.infer<typeof TrainingSchema>) {
  return updateSection(TrainingSchema, profileId, data, ["/app/bilan", `/app/bilan/${profileId}`]);
}

export async function updateQualitativeAction(profileId: string, data: z.infer<typeof QualitativeSchema>) {
  return updateSection(QualitativeSchema, profileId, data, ["/app/bilan", `/app/bilan/${profileId}`]);
}