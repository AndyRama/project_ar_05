import { z } from "zod";

export const MonthlyAuditSchema = z.object({
  age:                  z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Âge invalide"),
  size:                 z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Taille invalide"),
  weight:               z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Poids invalide"),
  profession:           z.string().min(1, "Profession requise"),
  pathology:            z.string().optional(),
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
});

export type MonthlyAuditData = z.infer<typeof MonthlyAuditSchema>;