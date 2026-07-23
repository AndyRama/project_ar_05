import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  LayoutDescription,
  LayoutActions
} from "@/features/page/layout";
import { getRequiredAdmin } from "@/lib/auth/auth-user";
import { FAKE_PROFILE } from "@/features/admin/demo-fiche/fake-data";
import { BodyDiagramCard } from "@/features/admin/demo-fiche/body-diagram-card";
import { PhotoCard } from "@/features/admin/demo-fiche/photos-suivi-card";
import { LifestyleCard } from "@/features/admin/demo-fiche/lifestyle-card";
import { TrainingCard } from "@/features/admin/demo-fiche/training-card";
import { MonthlyReviewCard } from "@/features/admin/demo-fiche/monthly-review-card";
import { MonthlyHistoryTable } from "@/features/admin/demo-fiche/monthly-history-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function DemoFichePage() {
  await getRequiredAdmin();

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Démo — Fiche de suivi complète Partie Client</LayoutTitle>
        <LayoutDescription>
          Aperçu avec données fictives — aucune donnée n'est enregistrée en base pour l'instant.
        </LayoutDescription>
      </LayoutHeader>

       <LayoutActions>
          <Link href="#">
            <Button className="gap-2 bg-orange-500 hover:bg-orange-400">
              <Plus className="size-4" />
              Nouveau bilan
            </Button>
          </Link>
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

          <Card className="border-orange-500/30 lg:col-span-3">
            <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
              <CardTitle className="px-2 text-orange-500 mt-10">Fiche de renseignements</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6 md:grid-cols-4">
              <Info label="Nom - Prénom" value={`${FAKE_PROFILE.firstname} ${FAKE_PROFILE.lastname}`} />
              <Info label="Âge" value={`${FAKE_PROFILE.age} ans`} />
              <Info label="Sexe" value={FAKE_PROFILE.gender === "HOMME" ? "Homme" : "Femme"} />
              <Info label="Profession" value={FAKE_PROFILE.profession} />
              <Info label="Téléphone" value={FAKE_PROFILE.phone} />
              <Info label="Email" value={FAKE_PROFILE.email} />
              <Info label="Début de suivi" value={FAKE_PROFILE.startDate.toLocaleDateString("fr-FR")} />
            </CardContent>
          </Card>
        </div>

        {/* Mensurations — pleine largeur */}
        <BodyDiagramCard />

        {/* Hygiène / Musculation / Bilan — 3 colonnes */}
        <div className="grid gap-6 lg:grid-cols-3">
          <LifestyleCard />
          <TrainingCard />
          <MonthlyReviewCard />
        </div>

        <MonthlyHistoryTable />

        {/* Photos de suivi — 3 colonnes */}
        <div className="grid gap-6 lg:grid-cols-3">
          <PhotoCard type="face" />
          <PhotoCard type="profil" />
          <PhotoCard type="dos" />
        </div>
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