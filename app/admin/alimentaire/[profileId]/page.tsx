import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getRequiredAdmin } from "@/lib/auth/auth-user";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BodyDiagramCard } from "@/features/admin/bilan-detail/body-diagram-card";
import { LifestyleCard } from "@/features/admin/bilan-detail/lifestyle-card";
import { TrainingCard } from "@/features/admin/bilan-detail/training-card";
import { MonthlyReviewCard } from "@/features/admin/bilan-detail/monthly-review-card";
import { MonthlyHistoryTable } from "@/features/admin/bilan-detail/monthly-history-table";
import type { PageParams } from "@/types/next";

type Props = PageParams<{ profileId: string }>;

export default async function AlimentaireDetailPage({ params }: Props) {
  await getRequiredAdmin();
  const { profileId } = await params;

  const profile = await prisma.alimentaireProfile.findUnique({
    where: { id: profileId },
    include: { user: { select: { name: true, email: true } } },
  });

  if (!profile) notFound();

  const allProfiles = await prisma.alimentaireProfile.findMany({
    where: { userId: profile.userId },
    orderBy: { createdAt: "asc" },
  });

  return (
    <Layout size="lg">
      <LayoutHeader>
        <div className="flex items-center gap-4">
          <Link href="/admin/alimentaire">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="size-4" />
              Retour
            </Button>
          </Link>
          <div>
            <LayoutTitle>Fiche de suivi — {profile.user?.name ?? "N/A"}</LayoutTitle>
            <p className="text-sm text-muted-foreground">{profile.user?.email}</p>
          </div>
        </div>
      </LayoutHeader>

      <LayoutContent className="space-y-6">
        {/* Logo (1/4) + Infos personnelles (3/4) */}
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
              <CardTitle className="px-2 text-orange-500">Fiche de renseignements</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6 md:grid-cols-4">
              <Info label="Nom - Prénom" value={profile.user?.name ?? "N/A"} />
              <Info label="Âge" value={`${profile.age} ans`} />
              <Info label="Sexe" value={profile.gender === "HOMME" ? "Homme" : profile.gender === "FEMME" ? "Femme" : "N/A"} />
              <Info label="Profession" value={profile.profession ?? "N/A"} />
              <Info label="Email" value={profile.user?.email ?? "N/A"} />
              <Info label="Date du bilan" value={new Date(profile.createdAt).toLocaleDateString("fr-FR")} />
            </CardContent>
          </Card>
        </div>

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