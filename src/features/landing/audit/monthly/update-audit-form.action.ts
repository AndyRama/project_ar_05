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

  const {
    age, size, weight, profession, pathology,
    hoursActivityPerWeek, stepsPerWeek, sleepHours,
    leftArm, rightArm, leftThigh, rightThigh,
    glutes, shoulders, chest, waist,
  } = parsed.data;

  try {
    await prisma.alimentaireProfile.update({
      where: { id: profileId },
      data: {
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
    logger.error("Échec de la mise à jour du bilan", { err, userId: user.id, profileId });
    throw new Error("Impossible de mettre à jour le bilan, merci de réessayer.");
  }

  revalidatePath("/app/bilan");

  return { success: true };
}