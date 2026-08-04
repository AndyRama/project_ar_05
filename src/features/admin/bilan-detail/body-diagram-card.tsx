"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AlimentaireProfile } from "@/generated/prisma";
import { EditableSection } from "./editable-section";
import { updateMeasurementsAction } from "./section-actions";

type BodyDiagramCardProps = {
  profile: AlimentaireProfile;
};

const fmt = (v: number | null) => (v === null ? "—" : `${v} cm`);

const FIELDS: { key: keyof MeasurementsForm; n: number | null; label: string }[] = [
  { key: "shoulders", n: 1, label: "Tour d'épaules" },
  { key: "chest", n: 2, label: "Tour de poitrine" },
  { key: "waist", n: 3, label: "Tour de taille" },
  { key: "back", n: 4, label: "Tour de dos" },
  { key: "hips", n: 6, label: "Tour de hanches" },
  { key: "glutes", n: 9, label: "Tour de fessiers" },
  { key: "leftArm", n: 7, label: "Bras gauche (flex)" },
  { key: "rightArm", n: 7, label: "Bras droit (flex)" },
  { key: "leftForearm", n: null, label: "Avant-bras gauche" },
  { key: "rightForearm", n: null, label: "Avant-bras droit" },
  { key: "leftThigh", n: 8, label: "Cuisse gauche" },
  { key: "rightThigh", n: 8, label: "Cuisse droite" },
  { key: "leftCalf", n: 11, label: "Mollet gauche" },
  { key: "rightCalf", n: 11, label: "Mollet droit" },
];

type MeasurementsForm = {
  weight: string;
  bodyFatPercentage: string;
  shoulders: string;
  chest: string;
  waist: string;
  back: string;
  hips: string;
  glutes: string;
  leftArm: string;
  rightArm: string;
  leftForearm: string;
  rightForearm: string;
  leftThigh: string;
  rightThigh: string;
  leftCalf: string;
  rightCalf: string;
};

export const BodyDiagramCard = ({ profile }: BodyDiagramCardProps) => {
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

  const initialValues: MeasurementsForm = {
    weight: String(profile.weight),
    bodyFatPercentage: profile.bodyFatPercentage ? String(profile.bodyFatPercentage) : "",
    shoulders: profile.shoulders ? String(profile.shoulders) : "",
    chest: profile.chest ? String(profile.chest) : "",
    waist: profile.waist ? String(profile.waist) : "",
    back: profile.back ? String(profile.back) : "",
    hips: profile.hips ? String(profile.hips) : "",
    glutes: profile.glutes ? String(profile.glutes) : "",
    leftArm: profile.leftArm ? String(profile.leftArm) : "",
    rightArm: profile.rightArm ? String(profile.rightArm) : "",
    leftForearm: profile.leftForearm ? String(profile.leftForearm) : "",
    rightForearm: profile.rightForearm ? String(profile.rightForearm) : "",
    leftThigh: profile.leftThigh ? String(profile.leftThigh) : "",
    rightThigh: profile.rightThigh ? String(profile.rightThigh) : "",
    leftCalf: profile.leftCalf ? String(profile.leftCalf) : "",
    rightCalf: profile.rightCalf ? String(profile.rightCalf) : "",
  };

  return (
    <Card className="border-orange-500/30">
      <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
        <CardTitle className="px-2 text-orange-500">Mensurations corporelles</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 pt-6 lg:grid-cols-3">
        {/* Colonne 1 : tableau détaillé (lecture seule) */}
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

        {/* Colonne 2 : diagramme (lecture seule) */}
        <div className="min-w-0 flex items-start justify-center">
          <img
            src="/images/body-diagram.jpg"
            alt="Diagramme des points de mesure"
            className="max-w-xs rounded-md border"
          />
        </div>

        {/* Colonne 3 : éditable */}
        <div className="min-w-0">
          <EditableSection
            initialValues={initialValues}
            onSave={(v) => updateMeasurementsAction(profile.id, v)}
            view={
              <div className="space-y-1 pr-8">
                <div className="grid grid-cols-2 gap-2 border-b pb-2 text-xs font-semibold text-muted-foreground">
                  <span>Zone</span>
                  <span className="text-right">Valeur</span>
                </div>
                {FIELDS.map((f, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 border-b border-border/50 py-1.5 text-sm">
                    <span className="flex items-center gap-2">
                      {f.n && (
                        <span className="flex size-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                          {f.n}
                        </span>
                      )}
                      {f.label}
                    </span>
                    <span className="text-right font-medium">{fmt(profile[f.key as keyof AlimentaireProfile] as number | null)}</span>
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
            }
            renderForm={({ values, setValues }) => (
              <div className="flex max-h-[500px] flex-col gap-2 overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Poids (kg)">
                    <input
                      type="number" step="0.1"
                      value={values.weight}
                      onChange={(e) => setValues({ ...values, weight: e.target.value })}
                      className={inputCn}
                    />
                  </FormField>
                  <FormField label="Masse grasse (%)">
                    <input
                      type="number" step="0.1"
                      value={values.bodyFatPercentage}
                      onChange={(e) => setValues({ ...values, bodyFatPercentage: e.target.value })}
                      className={inputCn}
                    />
                  </FormField>
                </div>
                {FIELDS.map((f) => (
                  <FormField key={f.key} label={f.label}>
                    <input
                      type="number" step="0.1"
                      value={values[f.key]}
                      onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                      className={inputCn}
                    />
                  </FormField>
                ))}
              </div>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

// ── Helpers ──────────────────────────

const inputCn = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-orange-500/50";

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    {children}
  </div>
);