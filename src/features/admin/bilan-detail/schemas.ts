import { z } from "zod";

const RatingLevelSchema = z.enum(["TRES_FAIBLE", "FAIBLE", "MOYEN", "BON", "EXCELLENT"]);

// Accepte vide (non renseigné) ou une valeur numérique positive
const optionalNumStr = z
  .string()
  .optional()
  .refine((v) => !v || (!isNaN(Number(v)) && Number(v) > 0), "Valeur invalide");

export const MeasurementsSchema = z.object({
  weight: z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Poids invalide"), // seul champ vraiment requis
  bodyFatPercentage: optionalNumStr,
  shoulders: optionalNumStr,
  chest: optionalNumStr,
  waist: optionalNumStr,
  back: optionalNumStr,
  hips: optionalNumStr,
  glutes: optionalNumStr,
  leftArm: optionalNumStr,
  rightArm: optionalNumStr,
  leftForearm: optionalNumStr,
  rightForearm: optionalNumStr,
  leftThigh: optionalNumStr,
  rightThigh: optionalNumStr,
  leftCalf: optionalNumStr,
  rightCalf: optionalNumStr,
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