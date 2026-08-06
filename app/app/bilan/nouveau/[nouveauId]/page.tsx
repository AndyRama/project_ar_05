import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  LayoutActions,
} from "@/features/page/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { MonthlyAuditForm } from "@/features/landing/audit/month/audit-form";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NewBilanPage() {
  const user = await getRequiredUser();

  const lastProfile = await prisma.alimentaireProfile.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const defaultValues = lastProfile
    ? {
        age: String(lastProfile.age),
        size: String(lastProfile.size),
        weight: String(lastProfile.weight),
        gender: lastProfile.gender ?? undefined,
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
        back: lastProfile.back ? String(lastProfile.back) : "",
        hips: lastProfile.hips ? String(lastProfile.hips) : "",
        leftForearm: lastProfile.leftForearm ? String(lastProfile.leftForearm) : "",
        rightForearm: lastProfile.rightForearm ? String(lastProfile.rightForearm) : "",
        leftCalf: lastProfile.leftCalf ? String(lastProfile.leftCalf) : "",
        rightCalf: lastProfile.rightCalf ? String(lastProfile.rightCalf) : "",
        bodyFatPercentage: lastProfile.bodyFatPercentage ? String(lastProfile.bodyFatPercentage) : "",

        sleepQuality: lastProfile.sleepQuality ?? undefined,
        mealsPerDay: lastProfile.mealsPerDay ? String(lastProfile.mealsPerDay) : "",
        hydrationLiters: lastProfile.hydrationLiters ? String(lastProfile.hydrationLiters) : "",
        dietCompliance: lastProfile.dietCompliance ?? undefined,
        supplements: lastProfile.supplements ?? "",
        stressLevel: lastProfile.stressLevel ?? undefined,
        stressComment: lastProfile.stressComment ?? "",

        trainingSessionsPerWeek: lastProfile.trainingSessionsPerWeek ? String(lastProfile.trainingSessionsPerWeek) : "",
        avgSessionDuration: lastProfile.avgSessionDuration ? String(lastProfile.avgSessionDuration) : "",
        trainingIntensity: lastProfile.trainingIntensity ?? undefined,
        monthlyFocus: lastProfile.monthlyFocus ?? "",
        monthlyProgress: lastProfile.monthlyProgress ?? "",
        pointsToImprove: lastProfile.pointsToImprove ?? "",

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
        <Link href={`/app/bilan`}>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="size-4" />
            Retour
          </Button>
        </Link>
      </LayoutActions>

      <LayoutContent className="space-y-6">
        {/* Logo (1/4) + Intro (3/4) — même habillage que la page détail */}
        <div className="grid gap-6 lg:grid-cols-4">
          <Card className="flex items-center justify-center border-orange-500/30 lg:col-span-1">
            <CardContent className="flex items-center justify-center p-6">
              <img
                src="/images/logo-suivi-mensuel.jpg"
                alt="Team UNL Coaching"
                className="w-full max-w-[200px] object-contain"
              />
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 lg:col-span-3">
            <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
              <CardTitle className="px-2 text-orange-500">Nouveau bilan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                {lastProfile
                  ? "Le formulaire est pré-rempli avec les valeurs de ton dernier bilan. Ajuste ce qui a changé."
                  : "Remplis ce formulaire pour créer ton premier bilan mensuel."}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto max-w-5xl">
          <MonthlyAuditForm defaultValues={defaultValues} />
        </div>
      </LayoutContent>
    </Layout>
  );
}