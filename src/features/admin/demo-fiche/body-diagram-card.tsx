import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FAKE_PROFILE } from "./fake-data";

const MEASUREMENTS = [
  { n: 1, label: "Tour d'épaules", value: FAKE_PROFILE.shoulders },
  { n: 2, label: "Tour de poitrine", value: FAKE_PROFILE.chest },
  { n: 3, label: "Tour de taille", value: FAKE_PROFILE.waist },
  { n: 4, label: "Tour de dos", value: FAKE_PROFILE.back },
  { n: 6, label: "Tour de hanches", value: FAKE_PROFILE.hips },
  { n: 9, label: "Tour de fessiers", value: FAKE_PROFILE.glutes },
  { n: 7, label: "Bras gauche (flex)", value: FAKE_PROFILE.leftArm },
  { n: 7, label: "Bras droit (flex)", value: FAKE_PROFILE.rightArm },
  { n: null, label: "Avant-bras gauche", value: FAKE_PROFILE.leftForearm },
  { n: null, label: "Avant-bras droit", value: FAKE_PROFILE.rightForearm },
  { n: 8, label: "Cuisse gauche", value: FAKE_PROFILE.leftThigh },
  { n: 8, label: "Cuisse droite", value: FAKE_PROFILE.rightThigh },
  { n: 11, label: "Mollet gauche", value: FAKE_PROFILE.leftCalf },
  { n: 11, label: "Mollet droit", value: FAKE_PROFILE.rightCalf },
];

// Table détaillée (Muscle/Zone, Valeur, Date, Notes) — comme sur la fiche papier
const DETAILED_TABLE = [
  { zone: "Tour d'épaules", value: FAKE_PROFILE.shoulders, note: "" },
  { zone: "Épaule gauche", value: null, note: "" },
  { zone: "Épaule droite", value: null, note: "" },
  { zone: "Tour de poitrine", value: FAKE_PROFILE.chest, note: "" },
  { zone: "Tour de dos", value: FAKE_PROFILE.back, note: "" },
  { zone: "Tour de taille", value: FAKE_PROFILE.waist, note: "" },
  { zone: "Tour de hanches", value: FAKE_PROFILE.hips, note: "" },
  { zone: "Tour de fessiers", value: FAKE_PROFILE.glutes, note: "" },
  { zone: "Bras gauche (flex)", value: FAKE_PROFILE.leftArm, note: "" },
  { zone: "Bras droit (flex)", value: FAKE_PROFILE.rightArm, note: "" },
  { zone: "Avant-bras gauche", value: FAKE_PROFILE.leftForearm, note: "" },
  { zone: "Avant-bras droit", value: FAKE_PROFILE.rightForearm, note: "" },
  { zone: "Cuisse gauche", value: FAKE_PROFILE.leftThigh, note: "" },
  { zone: "Cuisse droite", value: FAKE_PROFILE.rightThigh, note: "" },
  { zone: "Mollet gauche", value: FAKE_PROFILE.leftCalf, note: "" },
  { zone: "Mollet droit", value: FAKE_PROFILE.rightCalf, note: "" },
  { zone: "Poids (kg)", value: FAKE_PROFILE.weight, note: "" },
  { zone: "Masse grasse (%)", value: FAKE_PROFILE.bodyFatPercentage, note: "" },
];

const today = new Date().toLocaleDateString("fr-FR");

export const BodyDiagramCard = () => (
  <Card className="flex h-full flex-col border-orange-500/30">
    <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
      <CardTitle className="px-2 text-orange-500">Mensurations corporelles</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
      {/* Colonne gauche : diagramme + tableau détaillé */}
      <div className="flex flex-col gap-4">
        <img
          src="/images/body-diagram.jpg"
          alt="Diagramme des points de mesure"
          className="mx-auto max-w-xs rounded-md border"
        />
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Zone</TableHead>
                <TableHead className="text-xs">Valeur (cm)</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DETAILED_TABLE.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="py-1.5 text-xs font-medium">{row.zone}</TableCell>
                  <TableCell className="py-1.5 text-xs">{row.value ?? "—"}</TableCell>
                  <TableCell className="py-1.5 text-xs text-muted-foreground">{today}</TableCell>
                  <TableCell className="py-1.5 text-xs text-muted-foreground">{row.note || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Colonne droite : liste numérotée + poids/masse grasse */}
      <div className="space-y-1">
        <div className="grid grid-cols-2 gap-2 border-b pb-2 text-xs font-semibold text-muted-foreground">
          <span>Zone</span>
          <span className="text-right">Valeur</span>
        </div>
        {MEASUREMENTS.map((m, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 border-b border-border/50 py-1.5 text-sm">
            <span className="flex items-center gap-2">
              {m.n && (
                <span className="flex size-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {m.n}
                </span>
              )}
              {m.label}
            </span>
            <span className="text-right font-medium">{m.value} cm</span>
          </div>
        ))}
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div className="rounded-md border border-orange-500/20 bg-orange-500/5 p-3">
            <p className="text-xs text-muted-foreground">Poids</p>
            <p className="text-xl font-bold text-orange-500">{FAKE_PROFILE.weight} kg</p>
          </div>
          <div className="rounded-md border border-orange-500/20 bg-orange-500/5 p-3">
            <p className="text-xs text-muted-foreground">Masse grasse</p>
            <p className="text-xl font-bold text-orange-500">{FAKE_PROFILE.bodyFatPercentage}%</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);