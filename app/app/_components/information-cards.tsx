import { Scale, Ruler, Calendar, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type InformationCardsProps = {
  latestWeight: number | null;
  previousWeight: number | null;
  latestWaist: number | null;
  previousWaist: number | null;
  bilanCount: number;
  lastBilanDate: Date | null;
};

export default function InformationCards({
  latestWeight,
  previousWeight,
  latestWaist,
  previousWaist,
  bilanCount,
  lastBilanDate,
}: InformationCardsProps) {
  const weightDiff = latestWeight !== null && previousWeight !== null
    ? +(latestWeight - previousWeight).toFixed(1)
    : null;

  const waistDiff = latestWaist !== null && previousWaist !== null
    ? +(latestWaist - previousWaist).toFixed(1)
    : null;

  return (
    <div className="flex w-full items-start gap-4 max-lg:flex-col lg:gap-8">
      <Card className="w-full flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Poids actuel</CardTitle>
          <Scale className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {latestWeight !== null ? `${latestWeight} kg` : "N/A"}
          </div>
          <DiffLabel value={weightDiff} unit="kg" lowerIsBetter />
        </CardContent>
      </Card>

      <Card className="w-full flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tour de taille</CardTitle>
          <Ruler className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {latestWaist !== null ? `${latestWaist} cm` : "N/A"}
          </div>
          <DiffLabel value={waistDiff} unit="cm" lowerIsBetter />
        </CardContent>
      </Card>

      <Card className="w-full flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bilans enregistrés</CardTitle>
          <Calendar className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{bilanCount}</div>
          <p className="text-muted-foreground text-xs">
            {bilanCount === 0 ? "Aucun bilan pour le moment" : "Depuis le début du suivi"}
          </p>
        </CardContent>
      </Card>

      <Card className="w-full flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dernier bilan</CardTitle>
          <Calendar className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {lastBilanDate
              ? new Date(lastBilanDate).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })
              : "N/A"}
          </div>
          <p className="text-muted-foreground text-xs">
            {lastBilanDate
              ? new Date(lastBilanDate).toLocaleDateString("fr-FR", { year: "numeric" })
              : "Pas encore de bilan"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function DiffLabel({
  value,
  unit,
  lowerIsBetter,
}: {
  value: number | null;
  unit: string;
  lowerIsBetter: boolean;
}) {
  if (value === null) {
    return <p className="text-muted-foreground text-xs">Pas encore de comparaison</p>;
  }

  if (value === 0) {
    return (
      <p className="text-muted-foreground flex items-center gap-1 text-xs">
        <Minus className="size-3" /> Stable depuis le dernier bilan
      </p>
    );
  }

  const isPositiveChange = lowerIsBetter ? value < 0 : value > 0;
  const Icon = value < 0 ? TrendingDown : TrendingUp;

  return (
    <p className={`flex items-center gap-1 text-xs ${isPositiveChange ? "text-green-500" : "text-orange-500"}`}>
      <Icon className="size-3" />
      {value > 0 ? "+" : ""}
      {value} {unit} depuis le dernier bilan
    </p>
  );
}