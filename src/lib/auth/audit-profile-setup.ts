import type { User } from "better-auth";
import { logger } from "../logger";
import { prisma } from "../prisma";

export const createInitialAlimentaireProfile = async (user: User) => {
  if (!user.email) {
    return;
  }

  const pending = await prisma.pendingAuditSubmission.findFirst({
    where: { email: user.email, consumedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (!pending) {
    return;
  }

  try {
    await prisma.alimentaireProfile.create({
      data: {
        userId: user.id,
        size: Number(pending.size),
        age: Number(pending.age),
        weight: Number(pending.weight),
        profession: pending.profession,
        pathology: pending.pathology,
        hoursActivityPerWeek: pending.hoursActivityPerWeek,
        stepsPerWeek: pending.stepsPerWeek,
        leftArm: Number(pending.leftArm),
        rightArm: Number(pending.rightArm),
        shoulders: Number(pending.shoulders),
        chest: Number(pending.chest),
        waist: Number(pending.waist),
        glutes: Number(pending.glutes),
        leftThigh: Number(pending.leftThigh),
        rightThigh: Number(pending.rightThigh),
        sleepHours: pending.sleepHours,
      },
    });

    await prisma.pendingAuditSubmission.update({
      where: { id: pending.id },
      data: { consumedAt: new Date() },
    });
  } catch (err) {
    logger.error("Échec de la création du bilan initial (AlimentaireProfile)", { err });
  }
};