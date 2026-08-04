"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AlimentaireProfile } from "@/generated/prisma";
import { Stars } from "./stars";
import { EditableSection } from "./editable-section";
import { updateLifestyleAction } from "./section-actions";
import { RATING_LEVELS, RATING_LABELS } from "./rating-constants";
import { cn } from "@/lib/utils";

export const LifestyleCard = ({ profile }: { profile: AlimentaireProfile }) => {
  const initialValues = {
    sleepHours: profile.sleepHours ?? "",
    sleepQuality: profile.sleepQuality ?? undefined,
    mealsPerDay: profile.mealsPerDay ? String(profile.mealsPerDay) : "",
    hydrationLiters: profile.hydrationLiters ? String(profile.hydrationLiters) : "",
    dietCompliance: profile.dietCompliance ?? undefined,
    supplements: profile.supplements ?? "",
    stressLevel: profile.stressLevel ?? undefined,
    stressComment: profile.stressComment ?? "",
  };

  return (
    <Card className="border-orange-500/30">
      <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
        <CardTitle className="px-2 text-orange-500">Hygiène de vie</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <EditableSection
          initialValues={initialValues}
          onSave={(v) => updateLifestyleAction(profile.id, v)}
          view={
            <div className="space-y-4 pr-8">
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
            </div>
          }
          renderForm={({ values, setValues }) => (
            <div className="flex flex-col gap-3">
              <FormField label="Heures de sommeil">
                <input
                  value={values.sleepHours}
                  onChange={(e) => setValues({ ...values, sleepHours: e.target.value })}
                  className={inputCn}
                />
              </FormField>
              <RatingButtons
                label="Qualité du sommeil"
                value={values.sleepQuality}
                onChange={(v) => setValues({ ...values, sleepQuality: v })}
              />
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Repas / jour">
                  <input
                    type="number"
                    value={values.mealsPerDay}
                    onChange={(e) => setValues({ ...values, mealsPerDay: e.target.value })}
                    className={inputCn}
                  />
                </FormField>
                <FormField label="Hydratation (L)">
                  <input
                    type="number"
                    step="0.1"
                    value={values.hydrationLiters}
                    onChange={(e) => setValues({ ...values, hydrationLiters: e.target.value })}
                    className={inputCn}
                  />
                </FormField>
              </div>
              <RatingButtons
                label="Respect du plan"
                value={values.dietCompliance}
                onChange={(v) => setValues({ ...values, dietCompliance: v })}
              />
              <FormField label="Suppléments">
                <input
                  value={values.supplements}
                  onChange={(e) => setValues({ ...values, supplements: e.target.value })}
                  className={inputCn}
                />
              </FormField>
              <RatingButtons
                label="Niveau de stress"
                value={values.stressLevel}
                onChange={(v) => setValues({ ...values, stressLevel: v })}
              />
              <FormField label="Commentaire stress">
                <textarea
                  value={values.stressComment}
                  onChange={(e) => setValues({ ...values, stressComment: e.target.value })}
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

// ── Helpers partagés (à extraire dans un fichier commun si réutilisés partout) ──

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