import { z } from "zod";

export const RATING_LEVELS = ["TRES_FAIBLE", "FAIBLE", "MOYEN", "BON", "EXCELLENT"] as const;
export const RATING_LABELS: Record<(typeof RATING_LEVELS)[number], string> = {
  TRES_FAIBLE: "Très faible",
  FAIBLE: "Faible",
  MOYEN: "Moyen",
  BON: "Bon",
  EXCELLENT: "Excellent",
};

const RatingLevelSchema = z.enum(RATING_LEVELS);

export const MonthlyAuditSchema = z.object({
  age:    z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Âge invalide"),
  size:   z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Taille invalide"),
  weight: z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Poids invalide"),
  gender: z.enum(["HOMME", "FEMME"]).optional(),
  profession: z.string().min(1, "Profession requise"),
  pathology:  z.string().optional(),

  hoursActivityPerWeek: z.string().min(1, "Requis"),
  stepsPerWeek:         z.string().min(1, "Requis"),
  sleepHours:           z.string().min(1, "Requis"),

  leftArm:    z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  rightArm:   z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  leftThigh:  z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  rightThigh: z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  glutes:     z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  shoulders:  z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  chest:      z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  waist:      z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),

  back:              z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  hips:              z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  leftForearm:       z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  rightForearm:      z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  leftCalf:          z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  rightCalf:         z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  bodyFatPercentage: z.string().optional(),

  sleepQuality:    RatingLevelSchema.optional(),
  mealsPerDay:     z.string().optional(),
  hydrationLiters: z.string().optional(),
  dietCompliance:  RatingLevelSchema.optional(),
  supplements:     z.string().optional(),
  stressLevel:     RatingLevelSchema.optional(),
  stressComment:   z.string().optional(),

  trainingSessionsPerWeek: z.string().optional(),
  avgSessionDuration:      z.string().optional(),
  trainingIntensity:       RatingLevelSchema.optional(),
  monthlyFocus:            z.string().optional(),
  monthlyProgress:         z.string().optional(),
  pointsToImprove:         z.string().optional(),

  energyLevel:         RatingLevelSchema.optional(),
  motivationLevel:     RatingLevelSchema.optional(),
  recoveryLevel:       RatingLevelSchema.optional(),
  monthlyObservations: z.string().optional(),
  nextMonthGoals:      z.string().optional(),
});

export type MonthlyAuditData = z.infer<typeof MonthlyAuditSchema>;