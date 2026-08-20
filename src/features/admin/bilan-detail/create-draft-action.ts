"use server";

import { getRequiredUser } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createDraftBilanAction() {
  const user = await getRequiredUser();

  const lastProfile = await prisma.alimentaireProfile.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  if (!lastProfile) {
    throw new Error("Aucun bilan précédent trouvé, impossible de créer un nouveau bilan.");
  }

  let newProfile;
  try {
    newProfile = await prisma.alimentaireProfile.create({
      data: {
        userId: user.id,
        plan: lastProfile.plan,
        // Copie tous les champs du dernier bilan comme point de départ
        age: lastProfile.age,
        size: lastProfile.size,
        weight: lastProfile.weight,
        gender: lastProfile.gender,
        profession: lastProfile.profession,
        pathology: lastProfile.pathology,
        hoursActivityPerWeek: lastProfile.hoursActivityPerWeek,
        stepsPerWeek: lastProfile.stepsPerWeek,
        sleepHours: lastProfile.sleepHours,
        leftArm: lastProfile.leftArm,
        rightArm: lastProfile.rightArm,
        shoulders: lastProfile.shoulders,
        chest: lastProfile.chest,
        waist: lastProfile.waist,
        glutes: lastProfile.glutes,
        leftThigh: lastProfile.leftThigh,
        rightThigh: lastProfile.rightThigh,
        back: lastProfile.back,
        hips: lastProfile.hips,
        leftForearm: lastProfile.leftForearm,
        rightForearm: lastProfile.rightForearm,
        leftCalf: lastProfile.leftCalf,
        rightCalf: lastProfile.rightCalf,
        bodyFatPercentage: lastProfile.bodyFatPercentage,
        sleepQuality: lastProfile.sleepQuality,
        mealsPerDay: lastProfile.mealsPerDay,
        hydrationLiters: lastProfile.hydrationLiters,
        dietCompliance: lastProfile.dietCompliance,
        supplements: lastProfile.supplements,
        stressLevel: lastProfile.stressLevel,
        stressComment: lastProfile.stressComment,
        trainingSessionsPerWeek: lastProfile.trainingSessionsPerWeek,
        avgSessionDuration: lastProfile.avgSessionDuration,
        trainingIntensity: lastProfile.trainingIntensity,
        monthlyFocus: lastProfile.monthlyFocus,
        // Le bilan qualitatif du mois n'est volontairement pas reconduit :
        // ce sont des ressentis propres au mois passé
        monthlyProgress: null,
        pointsToImprove: null,
        energyLevel: null,
        motivationLevel: null,
        recoveryLevel: null,
        monthlyObservations: null,
        nextMonthGoals: null,
      },
    });
  } catch (err) {
    logger.error("Échec de la création du brouillon de bilan", { err, userId: user.id });
    throw new Error("Impossible de créer un nouveau bilan, merci de réessayer.");
  }
  revalidatePath("/app/bilan");
  redirect(`/app/bilan/${newProfile.id}`);
}