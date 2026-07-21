import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  LayoutActions,
} from "@/features/page/layout";
import { prisma } from "@/lib/prisma";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { MonthlyAuditForm } from "@/features/landing/audit/monthly/audit-form";
import { Plus, Files  } from "lucide-react";
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
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Nouveau bilan mensuel</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link href="/app">
          <Button className="gap-2 bg-orange-500 hover:bg-orange-400">
            <Plus className="size-4" />
             Performance
          </Button>
        </Link>
      </LayoutActions>

      <LayoutActions>  
        <Link href="/app/plan-alimentaire">
          <Button className="gap-2 bg-orange-500 hover:bg-orange-400">
            <Files  className="size-4" />
              Plan alimentaire PDF
          </Button>
        </Link>
      </LayoutActions>
      <LayoutContent>
        <div className="mx-auto max-w-2xl">
          <MonthlyAuditForm defaultValues={defaultValues} />
        </div>
      </LayoutContent>
    </Layout>
  );
}