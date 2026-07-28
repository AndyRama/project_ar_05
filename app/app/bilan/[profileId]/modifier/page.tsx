import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { prisma } from "@/lib/prisma";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { notFound } from "next/navigation";
import { MonthlyAuditForm } from "@/features/landing/audit/monthly/audit-form";
import type { PageParams } from "@/types/next";

type EditBilanPageProps = PageParams<{ profileId: string }>;

export default async function EditBilanPage({ params }: EditBilanPageProps) {
  const user = await getRequiredUser();
  const { profileId } = await params;

  const profile = await prisma.alimentaireProfile.findUnique({
    where: { id: profileId },
  });

  if (!profile || profile.userId !== user.id) {
    notFound();
  }

  const defaultValues = {
    age: String(profile.age),
    size: String(profile.size),
    weight: String(profile.weight),
    profession: profile.profession ?? "",
    pathology: profile.pathology ?? "",
    hoursActivityPerWeek: profile.hoursActivityPerWeek ?? "",
    stepsPerWeek: profile.stepsPerWeek ?? "",
    sleepHours: profile.sleepHours ?? "",
    leftArm: profile.leftArm ? String(profile.leftArm) : "",
    rightArm: profile.rightArm ? String(profile.rightArm) : "",
    leftThigh: profile.leftThigh ? String(profile.leftThigh) : "",
    rightThigh: profile.rightThigh ? String(profile.rightThigh) : "",
    glutes: profile.glutes ? String(profile.glutes) : "",
    shoulders: profile.shoulders ? String(profile.shoulders) : "",
    chest: profile.chest ? String(profile.chest) : "",
    waist: profile.waist ? String(profile.waist) : "",
  };

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Modifier le bilan</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="mx-auto max-w-2xl">
          <MonthlyAuditForm
            mode="edit"
            profileId={profile.id}
            defaultValues={defaultValues}
          />
        </div>
      </LayoutContent>
    </Layout>
  );
}