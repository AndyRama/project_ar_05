import type { Plan } from "@/generated/prisma";

// Clés = noms des membres de l'enum Prisma (ex: profile.plan côté TS)
export const PLAN_LABELS: Record<Plan, string> = {
  STARTER: "Starter — 3 mois",
  PREMIUM: "Premium — 6 mois",
  COMPETITION_VIP: "Competition VIP — 12 mois",
};

// Conversion enum Prisma → valeur minuscule (front / EditableSection)
export const PLAN_DB_VALUES: Record<Plan, "starter" | "premium" | "competition-vip"> = {
  STARTER: "starter",
  PREMIUM: "premium",
  COMPETITION_VIP: "competition-vip",
};

// Conversion valeur minuscule (formulaire / Zod) → enum Prisma
export const PLAN_FROM_DB_VALUE: Record<"starter" | "premium" | "competition-vip", Plan> = {
  starter: "STARTER",
  premium: "PREMIUM",
  "competition-vip": "COMPETITION_VIP",
};