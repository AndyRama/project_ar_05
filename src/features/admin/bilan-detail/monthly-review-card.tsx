import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AlimentaireProfile } from "@/generated/prisma";
import { Stars } from "./stars";

export const MonthlyReviewCard = ({ profile }: { profile: AlimentaireProfile }) => (
  <Card className="border-orange-500/30">
    <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
      <CardTitle className="px-2 text-orange-500">Bilan qualitatif du mois</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 pt-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Énergie</p>
          <Stars level={profile.energyLevel} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Motivation</p>
          <Stars level={profile.motivationLevel} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Récupération</p>
          <Stars level={profile.recoveryLevel} />
        </div>
      </div>
      <hr />
      <div>
        <p className="text-xs font-medium text-muted-foreground">Résultats / observations</p>
        <p className="text-sm">{profile.monthlyObservations ?? "Non renseigné"}</p>
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">Objectifs du mois prochain</p>
        <p className="text-sm">{profile.nextMonthGoals ?? "Non renseigné"}</p>
      </div>
    </CardContent>
  </Card>
);