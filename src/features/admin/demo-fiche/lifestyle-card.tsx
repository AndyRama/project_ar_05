import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FAKE_PROFILE } from "./fake-data";
import { Stars } from "./stars";

export const LifestyleCard = () => (
  <Card className="border-orange-500/30">
    <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
      <CardTitle className="px-2 text-orange-500 mt-10">Hygiène de vie</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 pt-6">
      <div>
        <p className="text-xs font-medium text-muted-foreground">Sommeil</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm">{FAKE_PROFILE.sleepHoursAvg}h / nuit en moyenne</span>
          <Stars level={FAKE_PROFILE.sleepQuality} />
        </div>
      </div>
      <hr />
      <div>
        <p className="text-xs font-medium text-muted-foreground">Nutrition</p>
        <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
          <span>{FAKE_PROFILE.mealsPerDay} repas / jour</span>
          <span>{FAKE_PROFILE.hydrationLiters} L / jour</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Respect du plan</span>
          <Stars level={FAKE_PROFILE.dietCompliance} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Suppléments : {FAKE_PROFILE.supplements}</p>
      </div>
      <hr />
      <div>
        <p className="text-xs font-medium text-muted-foreground">Gestion du stress</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm">{FAKE_PROFILE.stressComment}</span>
          <Stars level={FAKE_PROFILE.stressLevel} />
        </div>
      </div>
    </CardContent>
  </Card>
);