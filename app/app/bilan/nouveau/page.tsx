import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  LayoutActions,
} from "@/features/page/layout";
import { prisma } from "@/lib/prisma";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { MonthlyAuditForm } from "@/features/landing/audit/month/audit-form";
import { Files } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        // Informations personnelles
        age: String(lastProfile.age),
        size: String(lastProfile.size),
        weight: String(lastProfile.weight),
        gender: lastProfile.gender ?? undefined,
        profession: lastProfile.profession ?? "",
        pathology: lastProfile.pathology ?? "",

        // Activité physique
        hoursActivityPerWeek: lastProfile.hoursActivityPerWeek ?? "",
        stepsPerWeek: lastProfile.stepsPerWeek ?? "",
        sleepHours: lastProfile.sleepHours ?? "",

        // Mensurations
        leftArm: lastProfile.leftArm ? String(lastProfile.leftArm) : "",
        rightArm: lastProfile.rightArm ? String(lastProfile.rightArm) : "",
        leftThigh: lastProfile.leftThigh ? String(lastProfile.leftThigh) : "",
        rightThigh: lastProfile.rightThigh ? String(lastProfile.rightThigh) : "",
        glutes: lastProfile.glutes ? String(lastProfile.glutes) : "",
        shoulders: lastProfile.shoulders ? String(lastProfile.shoulders) : "",
        chest: lastProfile.chest ? String(lastProfile.chest) : "",
        waist: lastProfile.waist ? String(lastProfile.waist) : "",
        back: lastProfile.back ? String(lastProfile.back) : "",
        hips: lastProfile.hips ? String(lastProfile.hips) : "",
        leftForearm: lastProfile.leftForearm ? String(lastProfile.leftForearm) : "",
        rightForearm: lastProfile.rightForearm ? String(lastProfile.rightForearm) : "",
        leftCalf: lastProfile.leftCalf ? String(lastProfile.leftCalf) : "",
        rightCalf: lastProfile.rightCalf ? String(lastProfile.rightCalf) : "",
        bodyFatPercentage: lastProfile.bodyFatPercentage ? String(lastProfile.bodyFatPercentage) : "",

        // Hygiène de vie
        sleepQuality: lastProfile.sleepQuality ?? undefined,
        mealsPerDay: lastProfile.mealsPerDay ? String(lastProfile.mealsPerDay) : "",
        hydrationLiters: lastProfile.hydrationLiters ? String(lastProfile.hydrationLiters) : "",
        dietCompliance: lastProfile.dietCompliance ?? undefined,
        supplements: lastProfile.supplements ?? "",
        stressLevel: lastProfile.stressLevel ?? undefined,
        stressComment: lastProfile.stressComment ?? "",

        // Musculation
        trainingSessionsPerWeek: lastProfile.trainingSessionsPerWeek ? String(lastProfile.trainingSessionsPerWeek) : "",
        avgSessionDuration: lastProfile.avgSessionDuration ? String(lastProfile.avgSessionDuration) : "",
        trainingIntensity: lastProfile.trainingIntensity ?? undefined,
        monthlyFocus: lastProfile.monthlyFocus ?? "",
        monthlyProgress: lastProfile.monthlyProgress ?? "",
        pointsToImprove: lastProfile.pointsToImprove ?? "",

        // Bilan qualitatif — volontairement non pré-rempli : ce sont des
        // observations propres au mois passé, pas des valeurs à reconduire
        energyLevel: undefined,
        motivationLevel: undefined,
        recoveryLevel: undefined,
        monthlyObservations: "",
        nextMonthGoals: "",
      }
    : undefined;

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Nouveau bilan mensuel</LayoutTitle>
      </LayoutHeader>

      <LayoutActions>
        <Link href="/app/demo-live">
          <Button className="gap-2 bg-orange-500 hover:bg-orange-400">
            <Files className="size-4" />
            Plan alimentaire V2
          </Button>
        </Link>
      </LayoutActions>

      <LayoutContent>
        <div className="mx-auto max-w-5xl">
          <MonthlyAuditForm defaultValues={defaultValues} />
        </div>
      </LayoutContent>
    </Layout>
  );
}