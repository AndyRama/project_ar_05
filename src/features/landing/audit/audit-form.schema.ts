import { z } from "zod";

export const PLANS = [
  { value: "starter", label: "Starter — 3 mois", price: "160€/mois" },
  { value: "premium", label: "Premium — 6 mois", price: "180€/mois" },
  { value: "competition-vip", label: "Competition VIP — 12 mois", price: "150€/mois" },
] as const;

export const Step1Schema = z.object({
  plan: z.enum(["starter", "premium", "competition-vip"], {
    error: "Veuillez sélectionner un plan",
  }),
  firstname: z.string().min(2, "Prénom requis"),
  lastname:  z.string().min(2, "Nom requis"),
  phone:     z.string().min(10, "Téléphone invalide"),
  email:     z.string().email("Email invalide"),
});

export const Step2Schema = z.object({
  age:                  z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Âge invalide"),
  size:                 z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Taille invalide"),
  weight:               z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Poids invalide"),
  profession:           z.string().min(1, "Profession requise"),
  pathology:            z.string().optional(),
  hoursActivityPerWeek: z.string().min(1, "Requis"),
  stepsPerWeek:         z.string().min(1, "Requis"),
  sleepHours:           z.string().min(1, "Requis"),
});

export const Step3Schema = z.object({
  leftArm:   z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  rightArm:  z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  leftThigh: z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  rightThigh:z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  glutes:    z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  shoulders: z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  chest:     z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  waist:     z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
});

export const AuditFormSchema = Step1Schema.merge(Step2Schema).merge(Step3Schema);
export type AuditFormData = z.infer<typeof AuditFormSchema>;