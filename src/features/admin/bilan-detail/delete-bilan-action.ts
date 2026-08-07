"use server";

import { getRequiredUser } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { revalidatePath } from "next/cache";

export async function deleteBilanAction(profileId: string) {
  const user = await getRequiredUser();

  const profile = await prisma.alimentaireProfile.findUnique({
    where: { id: profileId },
  });

  if (!profile || profile.userId !== user.id) {
    throw new Error("Bilan introuvable");
  }

  try {
    await prisma.alimentaireProfile.delete({
      where: { id: profileId },
    });
  } catch (err) {
    logger.error("Échec de la suppression du bilan", { err, userId: user.id, profileId });
    throw new Error("Impossible de supprimer ce bilan, merci de réessayer.");
  }

  revalidatePath("/app/bilan");

  return { success: true };
}