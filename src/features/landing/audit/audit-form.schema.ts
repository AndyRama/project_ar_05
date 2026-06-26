import { z } from "zod";

export const Step1Schema = z.object({
  firstname: z.string().min(2, "Prénom requis"),
  lastname:  z.string().min(2, "Nom requis"),
  phone:     z.string().min(10, "Téléphone invalide"),
  email:     z.string().email("Email invalide"),
});

export const Step2Schema = z.object({
  age:                  z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Âge invalide"),
  profession:           z.string().min(1, "Profession requise"),
  pathology:            z.string().optional(),
  hoursActivityPerWeek: z.string().min(1, "Requis"),
  stepsPerWeek:         z.string().min(1, "Requis"),
  sleepHours:           z.string().min(1, "Requis"),
});

export const Step3Schema = z.object({
  leftArm:   z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  rightArm:  z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  glutes:    z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  leftThigh: z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  rightThigh:z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  shoulders: z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  chest:     z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
  waist:     z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Valeur invalide"),
});

export const AuditFormSchema = Step1Schema.merge(Step2Schema).merge(Step3Schema);
export type AuditFormData = z.infer<typeof AuditFormSchema>;