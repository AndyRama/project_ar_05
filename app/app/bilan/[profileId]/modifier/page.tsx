import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  LayoutActions,
} from "@/features/page/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { BodyDiagramCard } from "@/features/admin/bilan-detail/body-diagram-card";
import { LifestyleCard } from "@/features/admin/bilan-detail/lifestyle-card";
import { TrainingCard } from "@/features/admin/bilan-detail/training-card";
import { MonthlyReviewCard } from "@/features/admin/bilan-detail/monthly-review-card";
import { MonthlyHistoryTable } from "@/features/admin/bilan-detail/monthly-history-table";
import type { PageParams } from "@/types/next";

type Props = PageParams<{ profileId: string }>;

export default async function MyBilanDetailPage({ params }: Props) {
  const user = await getRequiredUser();
  const { profileId } = await params;

  const profile = await prisma.alimentaireProfile.findUnique({
    where: { id: profileId },
  });

  if (!profile || profile.userId !== user.id) {
    notFound();
  }

  const allProfiles = await prisma.alimentaireProfile.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <Layout size="lg">
      <LayoutHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/app/bilan">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="size-4" />
                Retour
              </Button>
            </Link>
            <LayoutTitle>
              Bilan du {new Date(profile.createdAt).toLocaleDateString("fr-FR")}
            </LayoutTitle>
          </div>
          <LayoutActions>
          <Link href={`/app/bilan/${profile.id}/modifier`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Pencil className="size-4" />
              Modifier
            </Button>
          </Link>
          </LayoutActions>
        </div>
      </LayoutHeader>

      <LayoutContent className="space-y-6">
        <Card className="border-orange-500/30">
          <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
            <CardTitle className="px-2 text-orange-500">Fiche de renseignements</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 pt-6 md:grid-cols-4">
            <Info label="Âge" value={`${profile.age} ans`} />
            <Info label="Sexe" value={profile.gender === "HOMME" ? "Homme" : profile.gender === "FEMME" ? "Femme" : "N/A"} />
            <Info label="Profession" value={profile.profession ?? "N/A"} />
            <Info label="Date du bilan" value={new Date(profile.createdAt).toLocaleDateString("fr-FR")} />
          </CardContent>
        </Card>

        <BodyDiagramCard profile={profile} />

        <div className="grid gap-6 lg:grid-cols-3">
          <LifestyleCard profile={profile} />
          <TrainingCard profile={profile} />
          <MonthlyReviewCard profile={profile} />
        </div>

        <MonthlyHistoryTable profiles={allProfiles} />
      </LayoutContent>
    </Layout>
  );
}

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <p className="mt-1 text-sm font-semibold">{value}</p>
  </div>
);