import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { prisma } from "@/lib/prisma";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { MonthlyAuditForm } from "@/features/landing/audit/monthly/audit-form";

export default async function NewBilanPage() {
  const user = await getRequiredUser();

  const lastProfile = await prisma.alimentaireProfile.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  // Pré-remplissage avec les valeurs du dernier bilan (converties en string
  // pour matcher le schema Zod du formulaire)
  const defaultValues = lastProfile
    ? {
        age: String(lastProfile.age),
        size: String(lastProfile.size),
        weight: String(lastProfile.weight),
        profession: lastProfile.profession ?? "",
        pathology: lastProfile.pathology ?? "",
        hoursActivityPerWeek: lastProfile.hoursActivityPerWeek ?? "",
        stepsPerWeek: lastProfile.stepsPerWeek ?? "",
        sleepHours: lastProfile.sleepHours ?? "",
        leftArm: lastProfile.leftArm ? String(lastProfile.leftArm) : "",
        rightArm: lastProfile.rightArm ? String(lastProfile.rightArm) : "",
        leftThigh: lastProfile.leftThigh ? String(lastProfile.leftThigh) : "",
        rightThigh: lastProfile.rightThigh ? String(lastProfile.rightThigh) : "",
        glutes: lastProfile.glutes ? String(lastProfile.glutes) : "",
        shoulders: lastProfile.shoulders ? String(lastProfile.shoulders) : "",
        chest: lastProfile.chest ? String(lastProfile.chest) : "",
        waist: lastProfile.waist ? String(lastProfile.waist) : "",
      }
    : undefined;

  return (
    <Layout size="xl">
      <LayoutHeader>
        <LayoutTitle>Nouveau bilan mensuel</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="mx-auto max-w-2xl">
          <MonthlyAuditForm defaultValues={defaultValues} />
        </div>
      </LayoutContent>
    </Layout>
  );
}