"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AlimentaireProfile } from "@/generated/prisma";
import { Stars } from "./stars";
import { EditableSection } from "./editable-section";
import { updateTrainingAction } from "./section-actions";
import { RATING_LEVELS, RATING_LABELS } from "./rating-constants";
import { cn } from "@/lib/utils";

export const TrainingCard = ({ profile }: { profile: AlimentaireProfile }) => {
  const initialValues = {
    trainingSessionsPerWeek: profile.trainingSessionsPerWeek ? String(profile.trainingSessionsPerWeek) : "",
    avgSessionDuration: profile.avgSessionDuration ? String(profile.avgSessionDuration) : "",
    trainingIntensity: profile.trainingIntensity ?? undefined,
    monthlyFocus: profile.monthlyFocus ?? "",
    monthlyProgress: profile.monthlyProgress ?? "",
    pointsToImprove: profile.pointsToImprove ?? "",
  };

  return (
    <Card className="border-orange-500/30">
      <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
        <CardTitle className="px-2 text-orange-500">Musculation</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <EditableSection
          initialValues={initialValues}
          onSave={(v) => updateTrainingAction(profile.id, v)}
          view={
            <div className="space-y-3 pr-8">
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
            </div>
          }
          renderForm={({ values, setValues }) => (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Séances / semaine">
                  <input
                    type="number"
                    value={values.trainingSessionsPerWeek}
                    onChange={(e) => setValues({ ...values, trainingSessionsPerWeek: e.target.value })}
                    className={inputCn}
                  />
                </FormField>
                <FormField label="Durée moyenne (min)">
                  <input
                    type="number"
                    value={values.avgSessionDuration}
                    onChange={(e) => setValues({ ...values, avgSessionDuration: e.target.value })}
                    className={inputCn}
                  />
                </FormField>
              </div>
              <RatingButtons
                label="Intensité globale"
                value={values.trainingIntensity}
                onChange={(v) => setValues({ ...values, trainingIntensity: v })}
              />
              <FormField label="Focus du mois">
                <input
                  value={values.monthlyFocus}
                  onChange={(e) => setValues({ ...values, monthlyFocus: e.target.value })}
                  className={inputCn}
                />
              </FormField>
              <FormField label="Progression ce mois">
                <textarea
                  value={values.monthlyProgress}
                  onChange={(e) => setValues({ ...values, monthlyProgress: e.target.value })}
                  rows={2}
                  className={inputCn}
                />
              </FormField>
              <FormField label="Points à améliorer">
                <textarea
                  value={values.pointsToImprove}
                  onChange={(e) => setValues({ ...values, pointsToImprove: e.target.value })}
                  rows={2}
                  className={inputCn}
                />
              </FormField>
            </div>
          )}
        />
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

const RatingButtons = ({
  label, value, onChange,
}: { label: string; value: string | undefined; onChange: (v: any) => void }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    <div className="flex gap-1">
      {RATING_LEVELS.map((level) => (
        <button
          key={level}
          type="button"
          onClick={() => onChange(level)}
          className={cn(
            "flex-1 rounded-md border px-2 py-1.5 text-xs font-medium",
            value === level
              ? "border-orange-500 bg-orange-50 text-orange-600 dark:bg-orange-950/40"
              : "border-border bg-background text-muted-foreground"
          )}
        >
          {RATING_LABELS[level]}
        </button>
      ))}
    </div>
  </div>
);