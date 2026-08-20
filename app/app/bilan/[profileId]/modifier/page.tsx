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
import { ArrowLeft } from "lucide-react";
import { BodyDiagramCard } from "@/features/admin/bilan-detail/body-diagram-card";
import { LifestyleCard } from "@/features/admin/bilan-detail/lifestyle-card";
import { TrainingCard } from "@/features/admin/bilan-detail/training-card";
import { MonthlyReviewCard } from "@/features/admin/bilan-detail/monthly-review-card";
import { MonthlyHistoryTable } from "@/features/admin/bilan-detail/monthly-history-table";
import { NotifyCoachButton } from "@/features/admin/bilan-detail/notify-coach-button";
import { FicheRenseignementsCard } from "@/features/admin/bilan-detail/fiche-renseignements-card";
import type { PageParams } from "@/types/next";

type Props = PageParams<{ profileId: string }>;

export default async function MyBilanDetailPage({ params }: Props) {
  const user = await getRequiredUser();
  const { profileId } = await params;

  const profile = await prisma.alimentaireProfile.findUnique({
    where: { id: profileId },
    include: { user: { select: { name: true, email: true } } },
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
        </div>
      </LayoutHeader>
    
      <LayoutActions>
        <NotifyCoachButton profileId={profile.id} />
      </LayoutActions>

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

          <FicheRenseignementsCard profile={profile} />
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