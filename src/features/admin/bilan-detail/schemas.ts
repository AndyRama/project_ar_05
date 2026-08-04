import { z } from "zod";

const RatingLevelSchema = z.enum(["TRES_FAIBLE", "FAIBLE", "MOYEN", "BON", "EXCELLENT"]);
const numStr = (msg: string) => z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, msg);

export const MeasurementsSchema = z.object({
  weight: numStr("Poids invalide"),
  bodyFatPercentage: z.string().optional(),
  shoulders: numStr("Valeur invalide"),
  chest: numStr("Valeur invalide"),
  waist: numStr("Valeur invalide"),
  back: numStr("Valeur invalide"),
  hips: numStr("Valeur invalide"),
  glutes: numStr("Valeur invalide"),
  leftArm: numStr("Valeur invalide"),
  rightArm: numStr("Valeur invalide"),
  leftForearm: numStr("Valeur invalide"),
  rightForearm: numStr("Valeur invalide"),
  leftThigh: numStr("Valeur invalide"),
  rightThigh: numStr("Valeur invalide"),
  leftCalf: numStr("Valeur invalide"),
  rightCalf: numStr("Valeur invalide"),
});
export type MeasurementsData = z.infer<typeof MeasurementsSchema>;

export const LifestyleSchema = z.object({
  sleepHours: z.string().optional(),
  sleepQuality: RatingLevelSchema.optional(),
  mealsPerDay: z.string().optional(),
  hydrationLiters: z.string().optional(),
  dietCompliance: RatingLevelSchema.optional(),
  supplements: z.string().optional(),
  stressLevel: RatingLevelSchema.optional(),
  stressComment: z.string().optional(),
});
export type LifestyleData = z.infer<typeof LifestyleSchema>;

export const TrainingSchema = z.object({
  trainingSessionsPerWeek: z.string().optional(),
  avgSessionDuration: z.string().optional(),
  trainingIntensity: RatingLevelSchema.optional(),
  monthlyFocus: z.string().optional(),
  monthlyProgress: z.string().optional(),
  pointsToImprove: z.string().optional(),
});
export type TrainingData = z.infer<typeof TrainingSchema>;

export const QualitativeSchema = z.object({
  energyLevel: RatingLevelSchema.optional(),
  motivationLevel: RatingLevelSchema.optional(),
  recoveryLevel: RatingLevelSchema.optional(),
  monthlyObservations: z.string().optional(),
  nextMonthGoals: z.string().optional(),
});
export type QualitativeData = z.infer<typeof QualitativeSchema>;