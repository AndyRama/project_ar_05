import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FAKE_PROFILE } from "./fake-data";
import { Stars } from "./stars";

export const MonthlyReviewCard = () => (
  <Card className="border-orange-500/30">
    <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
      <CardTitle className="px-2 text-orange-500">Bilan qualitatif du mois</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 pt-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Énergie</p>
          <Stars level={FAKE_PROFILE.energyLevel} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Motivation</p>
          <Stars level={FAKE_PROFILE.motivationLevel} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Récupération</p>
          <Stars level={FAKE_PROFILE.recoveryLevel} />
        </div>
      </div>
      <hr />
      <div>
        <p className="text-xs font-medium text-muted-foreground">Résultats / observations</p>
        <p className="text-sm">{FAKE_PROFILE.monthlyObservations}</p>
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">Objectifs du mois prochain</p>
        <p className="text-sm">{FAKE_PROFILE.nextMonthGoals}</p>
      </div>
    </CardContent>
  </Card>
);