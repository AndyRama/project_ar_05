"use server";

import { resend } from "@/lib/resend";
import { prisma } from "@/lib/prisma";
import { getRequiredUser } from "@/lib/auth/auth-user";

const COACH_EMAIL = process.env.COACH_EMAIL!;

export async function notifyCoachNewBilan(profileId: string) {
  const user = await getRequiredUser();

  const profile = await prisma.alimentaireProfile.findUnique({
    where: { id: profileId },
  });

  if (!profile || profile.userId !== user.id) {
    throw new Error("Non autorisé");
  }

  await resend.emails.send({
    from: "Unlcoaching <notifications@unlcoaching.com>",
    to: COACH_EMAIL,
    subject: `Demande de nouveau bilan — ${user.name}`,
    html: `
      <p><strong>${user.name}</strong> (${user.email}) souhaite réaliser un nouveau bilan.</p>
      <p>Dernier bilan enregistré : ${new Date(profile.createdAt).toLocaleDateString("fr-FR")}</p>
    `,
  });

  return { success: true };
}