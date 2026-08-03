import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AlimentaireProfile } from "@/generated/prisma";
import { Stars } from "./stars";

export const TrainingCard = ({ profile }: { profile: AlimentaireProfile }) => (
  <Card className="border-orange-500/30">
    <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
      <CardTitle className="px-2 text-orange-500">Musculation</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3 pt-6">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Séances / semaine</p>
          <p className="font-semibold">{profile.trainingSessionsPerWeek ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Durée moyenne</p>
          <p className="font-semibold">
            {profile.avgSessionDuration !== null ? `${profile.avgSessionDuration} min` : "—"}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Intensité globale</span>
        <Stars level={profile.trainingIntensity} />
      </div>
      <hr />
      <div>
        <p className="text-xs font-medium text-muted-foreground">Focus du mois</p>
        <p className="text-sm">{profile.monthlyFocus ?? "Non renseigné"}</p>
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">Progression</p>
        <p className="text-sm">{profile.monthlyProgress ?? "Non renseigné"}</p>
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">Points à améliorer</p>
        <p className="text-sm">{profile.pointsToImprove ?? "Non renseigné"}</p>
      </div>
    </CardContent>
  </Card>
);