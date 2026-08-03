import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AlimentaireProfile } from "@/generated/prisma";
import { RATING_STARS } from "./rating-constants";

export const MonthlyHistoryTable = ({ profiles }: { profiles: AlimentaireProfile[] }) => {
  // Ordre chronologique (le plus ancien en premier)
  const chronological = [...profiles].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  if (chronological.length === 0) {
    return null;
  }

  return (
    <Card className="border-orange-500/30">
      <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
        <CardTitle className="px-2 text-orange-500">Suivi mensuel</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Poids (kg)</TableHead>
                <TableHead>Masse grasse (%)</TableHead>
                <TableHead>Sommeil</TableHead>
                <TableHead>Nutrition</TableHead>
                <TableHead>Entraînement</TableHead>
                <TableHead>Énergie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chronological.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    {new Date(p.createdAt).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell>{p.weight}</TableCell>
                  <TableCell>{p.bodyFatPercentage ?? "—"}</TableCell>
                  <TableCell>{p.sleepQuality ? RATING_STARS[p.sleepQuality] : "—"}</TableCell>
                  <TableCell>{p.dietCompliance ? RATING_STARS[p.dietCompliance] : "—"}</TableCell>
                  <TableCell>{p.trainingIntensity ? RATING_STARS[p.trainingIntensity] : "—"}</TableCell>
                  <TableCell>{p.energyLevel ? RATING_STARS[p.energyLevel] : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};