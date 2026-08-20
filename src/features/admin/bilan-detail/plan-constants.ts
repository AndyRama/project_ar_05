import type { Plan } from "@/generated/prisma";

// Clés = noms des membres de l'enum Prisma (ex: profile.plan côté TS)
export const PLAN_LABELS: Record<Plan, string> = {
  STARTER: "Starter — 3 mois",
  PREMIUM: "Premium — 6 mois",
  COMPETITION_VIP: "Competition VIP — 12 mois",
};

// Conversion vers les valeurs minuscules attendues par EditableSection / updateFicheAction
export const PLAN_DB_VALUES: Record<Plan, "starter" | "premium" | "competition-vip"> = {
  STARTER: "starter",
  PREMIUM: "premium",
  COMPETITION_VIP: "competition-vip",
};