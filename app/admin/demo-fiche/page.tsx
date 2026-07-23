import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  LayoutDescription,
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

export default async function DemoFichePage() {
  await getRequiredAdmin();

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Démo — Fiche de suivi complète administrateur</LayoutTitle>
        <LayoutDescription>
          Aperçu avec données fictives — aucune donnée n'est enregistrée en base pour l'instant.
        </LayoutDescription>
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

        {/* Mensurations (2/3) + Hygiène/Musculation/Bilan (1/3, 3 cards empilées) */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BodyDiagramCard />
          </div>
          <div className="flex flex-col gap-6">
            <LifestyleCard />
            <TrainingCard />
            <MonthlyReviewCard />
          </div>
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