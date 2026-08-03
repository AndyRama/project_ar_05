import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AlimentaireProfile } from "@/generated/prisma";

type BodyDiagramCardProps = {
  profile: AlimentaireProfile;
};

const fmt = (v: number | null) => (v === null ? "—" : `${v} cm`);

export const BodyDiagramCard = ({ profile }: BodyDiagramCardProps) => {
  const measurements = [
    { n: 1, label: "Tour d'épaules", value: profile.shoulders },
    { n: 2, label: "Tour de poitrine", value: profile.chest },
    { n: 3, label: "Tour de taille", value: profile.waist },
    { n: 4, label: "Tour de dos", value: profile.back },
    { n: 6, label: "Tour de hanches", value: profile.hips },
    { n: 9, label: "Tour de fessiers", value: profile.glutes },
    { n: 7, label: "Bras gauche (flex)", value: profile.leftArm },
    { n: 7, label: "Bras droit (flex)", value: profile.rightArm },
    { n: null, label: "Avant-bras gauche", value: profile.leftForearm },
    { n: null, label: "Avant-bras droit", value: profile.rightForearm },
    { n: 8, label: "Cuisse gauche", value: profile.leftThigh },
    { n: 8, label: "Cuisse droite", value: profile.rightThigh },
    { n: 11, label: "Mollet gauche", value: profile.leftCalf },
    { n: 11, label: "Mollet droit", value: profile.rightCalf },
  ];

  const detailedTable = [
    { zone: "Tour d'épaules", value: profile.shoulders },
    { zone: "Tour de poitrine", value: profile.chest },
    { zone: "Tour de dos", value: profile.back },
    { zone: "Tour de taille", value: profile.waist },
    { zone: "Tour de hanches", value: profile.hips },
    { zone: "Tour de fessiers", value: profile.glutes },
    { zone: "Bras gauche (flex)", value: profile.leftArm },
    { zone: "Bras droit (flex)", value: profile.rightArm },
    { zone: "Avant-bras gauche", value: profile.leftForearm },
    { zone: "Avant-bras droit", value: profile.rightForearm },
    { zone: "Cuisse gauche", value: profile.leftThigh },
    { zone: "Cuisse droite", value: profile.rightThigh },
    { zone: "Mollet gauche", value: profile.leftCalf },
    { zone: "Mollet droit", value: profile.rightCalf },
    { zone: "Poids (kg)", value: profile.weight },
    { zone: "Masse grasse (%)", value: profile.bodyFatPercentage },
  ];

  const dateStr = new Date(profile.createdAt).toLocaleDateString("fr-FR");

  return (
    <Card className="border-orange-500/30">
      <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
        <CardTitle className="px-2 text-orange-500">Mensurations corporelles</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 pt-6 lg:grid-cols-3">
        <div className="min-w-0 w-full overflow-x-auto rounded-md border">
          <Table className="min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap text-xs">Zone</TableHead>
                <TableHead className="whitespace-nowrap text-xs">Valeur (cm)</TableHead>
                <TableHead className="whitespace-nowrap text-xs">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detailedTable.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="whitespace-nowrap py-1.5 text-xs font-medium">{row.zone}</TableCell>
                  <TableCell className="whitespace-nowrap py-1.5 text-xs">{row.value ?? "—"}</TableCell>
                  <TableCell className="whitespace-nowrap py-1.5 text-xs text-muted-foreground">{dateStr}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="min-w-0 flex items-start justify-center">
          <img
            src="/images/body-diagram.jpg"
            alt="Diagramme des points de mesure"
            className="max-w-xs rounded-md border"
          />
        </div>

        <div className="min-w-0 space-y-1">
          <div className="grid grid-cols-2 gap-2 border-b pb-2 text-xs font-semibold text-muted-foreground">
            <span>Zone</span>
            <span className="text-right">Valeur</span>
          </div>
          {measurements.map((m, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 border-b border-border/50 py-1.5 text-sm">
              <span className="flex items-center gap-2">
                {m.n && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    {m.n}
                  </span>
                )}
                {m.label}
              </span>
              <span className="text-right font-medium">{fmt(m.value)}</span>
            </div>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div className="rounded-md border border-orange-500/20 bg-orange-500/5 p-3">
              <p className="text-xs text-muted-foreground">Poids</p>
              <p className="text-xl font-bold text-orange-500">{profile.weight} kg</p>
            </div>
            <div className="rounded-md border border-orange-500/20 bg-orange-500/5 p-3">
              <p className="text-xs text-muted-foreground">Masse grasse</p>
              <p className="text-xl font-bold text-orange-500">
                {profile.bodyFatPercentage ?? "—"}{profile.bodyFatPercentage !== null && "%"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};