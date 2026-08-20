"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AlimentaireProfile } from "@/generated/prisma";
import { EditableSection } from "./editable-section";
import { updateFicheAction } from "./section-actions";
import { PLAN_LABELS, PLAN_DB_VALUES } from "./plan-constants";

type FicheRenseignementsCardProps = {
  profile: AlimentaireProfile & {
    user: { name: string | null; email: string | null } | null;
  };
};

export const FicheRenseignementsCard = ({ profile }: FicheRenseignementsCardProps) => {
	const initialValues = {
		age: String(profile.age),
		gender: profile.gender ?? undefined,
		profession: profile.profession ?? "",
		plan: profile.plan ? PLAN_DB_VALUES[profile.plan] : undefined,
	};

  return (
    <Card className="border-orange-500/30 lg:col-span-3">
      <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
        <CardTitle className="px-2 text-orange-500">Fiche de renseignements</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <EditableSection
          initialValues={initialValues}
          onSave={(v) => updateFicheAction(profile.id, v)}
          view={
            <div className="grid gap-4 pr-8 md:grid-cols-4">
              <Info label="Plan" value={profile.plan ? PLAN_LABELS[profile.plan] : "N/A"} />
              <Info label="Nom - Prénom" value={profile.user?.name ?? "N/A"} />
              <Info label="Âge" value={`${profile.age} ans`} />
              <Info
                label="Sexe"
                value={
                  profile.gender === "HOMME"
                    ? "Homme"
                    : profile.gender === "FEMME"
                    ? "Femme"
                    : "N/A"
                }
              />
              <Info label="Profession" value={profile.profession ?? "N/A"} />
              <Info label="Email" value={profile.user?.email ?? "N/A"} />
              <Info
                label="Début de suivi"
                value={new Date(profile.createdAt).toLocaleDateString("fr-FR")}
              />
            </div>
          }
          renderForm={({ values, setValues }) => (
            <div className="grid gap-3 md:grid-cols-2">
              <FormField label="Plan">
								<select
									value={values.plan ?? ""}
									onChange={(e) =>
										setValues({ ...values, plan: e.target.value as "starter" | "premium" | "competition-vip" })
									}
									className={inputCn}
								>
									<option value="">—</option>
									<option value="starter">Starter — 3 mois</option>
									<option value="premium">Premium — 6 mois</option>
									<option value="competition-vip">Competition VIP — 12 mois</option>
								</select>
							</FormField>
              <FormField label="Âge">
                <input
                  type="number"
                  value={values.age}
                  onChange={(e) => setValues({ ...values, age: e.target.value })}
                  className={inputCn}
                />
              </FormField>
              <FormField label="Sexe">
                <select
                  value={values.gender ?? ""}
                  onChange={(e) =>
                    setValues({ ...values, gender: e.target.value as "HOMME" | "FEMME" })
                  }
                  className={inputCn}
                >
                  <option value="">—</option>
                  <option value="HOMME">Homme</option>
                  <option value="FEMME">Femme</option>
                </select>
              </FormField>
              <FormField label="Profession">
                <input
                  value={values.profession}
                  onChange={(e) => setValues({ ...values, profession: e.target.value })}
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

const inputCn =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-orange-500/50";

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    {children}
  </div>
);

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <p className="mt-1 text-sm font-semibold">{value}</p>
  </div>
);