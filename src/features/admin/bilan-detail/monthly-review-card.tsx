"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AlimentaireProfile } from "@/generated/prisma";
import { Stars } from "./stars";
import { EditableSection } from "./editable-section";
import { updateQualitativeAction } from "./section-actions";
import { RATING_LEVELS, RATING_LABELS } from "./rating-constants";
import { cn } from "@/lib/utils";

export const MonthlyReviewCard = ({ profile }: { profile: AlimentaireProfile }) => {
  const initialValues = {
    energyLevel: profile.energyLevel ?? undefined,
    motivationLevel: profile.motivationLevel ?? undefined,
    recoveryLevel: profile.recoveryLevel ?? undefined,
    monthlyObservations: profile.monthlyObservations ?? "",
    nextMonthGoals: profile.nextMonthGoals ?? "",
  };

  return (
    <Card className="border-orange-500/30">
      <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
        <CardTitle className="px-2 text-orange-500">Bilan qualitatif du mois</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <EditableSection
          initialValues={initialValues}
          onSave={(v) => updateQualitativeAction(profile.id, v)}
          view={
            <div className="space-y-4 pr-8">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Énergie</p>
                  <Stars level={profile.energyLevel} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Motivation</p>
                  <Stars level={profile.motivationLevel} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Récupération</p>
                  <Stars level={profile.recoveryLevel} />
                </div>
              </div>
              <hr />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Résultats / observations</p>
                <p className="text-sm">{profile.monthlyObservations ?? "Non renseigné"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Objectifs du mois prochain</p>
                <p className="text-sm">{profile.nextMonthGoals ?? "Non renseigné"}</p>
              </div>
            </div>
          }
          renderForm={({ values, setValues }) => (
            <div className="flex flex-col gap-3">
              <RatingButtons
                label="Énergie"
                value={values.energyLevel}
                onChange={(v) => setValues({ ...values, energyLevel: v })}
              />
              <RatingButtons
                label="Motivation"
                value={values.motivationLevel}
                onChange={(v) => setValues({ ...values, motivationLevel: v })}
              />
              <RatingButtons
                label="Récupération"
                value={values.recoveryLevel}
                onChange={(v) => setValues({ ...values, recoveryLevel: v })}
              />
              <FormField label="Résultats / observations">
                <textarea
                  value={values.monthlyObservations}
                  onChange={(e) => setValues({ ...values, monthlyObservations: e.target.value })}
                  rows={3}
                  className={inputCn}
                />
              </FormField>
              <FormField label="Objectifs du mois prochain">
                <textarea
                  value={values.nextMonthGoals}
                  onChange={(e) => setValues({ ...values, nextMonthGoals: e.target.value })}
                  rows={3}
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