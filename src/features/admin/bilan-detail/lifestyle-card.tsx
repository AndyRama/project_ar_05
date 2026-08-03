import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AlimentaireProfile } from "@/generated/prisma";
import { Stars } from "./stars";

export const LifestyleCard = ({ profile }: { profile: AlimentaireProfile }) => (
  <Card className="border-orange-500/30">
    <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
      <CardTitle className="px-2 text-orange-500">Hygiène de vie</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 pt-6">
      <div>
        <p className="text-xs font-medium text-muted-foreground">Sommeil</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm">{profile.sleepHours ?? "N/A"}</span>
          <Stars level={profile.sleepQuality} />
        </div>
      </div>
      <hr />
      <div>
        <p className="text-xs font-medium text-muted-foreground">Nutrition</p>
        <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
          <span>{profile.mealsPerDay ?? "—"} repas / jour</span>
          <span>{profile.hydrationLiters ?? "—"} L / jour</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Respect du plan</span>
          <Stars level={profile.dietCompliance} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Suppléments : {profile.supplements ?? "Aucun renseigné"}
        </p>
      </div>
      <hr />
      <div>
        <p className="text-xs font-medium text-muted-foreground">Gestion du stress</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm">{profile.stressComment ?? "N/A"}</span>
          <Stars level={profile.stressLevel} />
        </div>
      </div>
    </CardContent>
  </Card>
);