"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  MonthlyAuditSchema,
  type MonthlyAuditData,
} from "./audit-form.schema";
import { submitMonthlyAuditAction } from "./audit-form.action";

type MonthlyAuditFormProps = {
  // Pré-remplissage optionnel avec les valeurs du dernier bilan
  defaultValues?: Partial<MonthlyAuditData>;
  onSuccess?: () => void;
};

export const MonthlyAuditForm = ({ defaultValues, onSuccess }: MonthlyAuditFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<MonthlyAuditData>({
    resolver: zodResolver(MonthlyAuditSchema),
    mode: "onTouched",
    defaultValues: {
      age: "",
      size: "",
      weight: "",
      profession: "",
      pathology: "",
      hoursActivityPerWeek: "",
      stepsPerWeek: "",
      sleepHours: "",
      leftArm: "",
      rightArm: "",
      leftThigh: "",
      rightThigh: "",
      glutes: "",
      shoulders: "",
      chest: "",
      waist: "",
      ...defaultValues,
    },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const onSubmit = async (data: MonthlyAuditData) => {
    setError(null);
    try {
      await submitMonthlyAuditAction(data);
      setSubmitted(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-md border border-border bg-card p-8 text-center">
        <div className="mb-3 text-3xl">✅</div>
        <h3 className="text-lg font-semibold text-foreground">Bilan enregistré !</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Ton coach recevra ces nouvelles données pour ajuster ton programme.
        </p>
      </div>
    );
  }

  return (
    <form data-testid="monthly-audit-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Profil & activité</h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Âge" required error={errors.age?.message}>
            <input {...register("age")} type="number" className={inputCn(!!errors.age)} />
          </Field>
          <Field label="Taille (cm)" required error={errors.size?.message}>
            <input {...register("size")} type="number" className={inputCn(!!errors.size)} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Poids (kg)" required error={errors.weight?.message}>
            <input {...register("weight")} type="number" step="0.1" className={inputCn(!!errors.weight)} />
          </Field>
          <Field label="Profession" required error={errors.profession?.message}>
            <input {...register("profession")} className={inputCn(!!errors.profession)} />
          </Field>
        </div>
        <Field label="Pathologie / maladie" error={errors.pathology?.message}>
          <textarea {...register("pathology")} rows={2} placeholder="Aucune ou décrivez vos conditions médicales" className={inputCn(!!errors.pathology)} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Heures d'activité / semaine" required error={errors.hoursActivityPerWeek?.message}>
            <input {...register("hoursActivityPerWeek")} className={inputCn(!!errors.hoursActivityPerWeek)} />
          </Field>
          <Field label="Pas par semaine" required error={errors.stepsPerWeek?.message}>
            <input {...register("stepsPerWeek")} className={inputCn(!!errors.stepsPerWeek)} />
          </Field>
        </div>
        <Field label="Heures de sommeil" required error={errors.sleepHours?.message}>
          <textarea {...register("sleepHours")} rows={2} className={inputCn(!!errors.sleepHours)} />
        </Field>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Mensurations (cm)</h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Bras gauche" required error={errors.leftArm?.message}>
            <input {...register("leftArm")} type="number" step="0.1" className={inputCn(!!errors.leftArm)} />
          </Field>
          <Field label="Bras droit" required error={errors.rightArm?.message}>
            <input {...register("rightArm")} type="number" step="0.1" className={inputCn(!!errors.rightArm)} />
          </Field>
          <Field label="Jambe gauche" required error={errors.leftThigh?.message}>
            <input {...register("leftThigh")} type="number" step="0.1" className={inputCn(!!errors.leftThigh)} />
          </Field>
          <Field label="Jambe droite" required error={errors.rightThigh?.message}>
            <input {...register("rightThigh")} type="number" step="0.1" className={inputCn(!!errors.rightThigh)} />
          </Field>
          <Field label="Fessiers" required error={errors.glutes?.message}>
            <input {...register("glutes")} type="number" step="0.1" className={inputCn(!!errors.glutes)} />
          </Field>
          <Field label="Épaules" required error={errors.shoulders?.message}>
            <input {...register("shoulders")} type="number" step="0.1" className={inputCn(!!errors.shoulders)} />
          </Field>
          <Field label="Poitrine" required error={errors.chest?.message}>
            <input {...register("chest")} type="number" step="0.1" className={inputCn(!!errors.chest)} />
          </Field>
          <Field label="Tour de taille" required error={errors.waist?.message}>
            <input {...register("waist")} type="number" step="0.1" className={inputCn(!!errors.waist)} />
          </Field>
        </div>
      </section>

      {error && <p data-testid="submit-error" className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        data-testid="submit-btn"
        className="rounded-md bg-orange-500 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-400 disabled:opacity-60"
      >
        {isSubmitting ? "Envoi…" : "Enregistrer mon bilan mensuel"}
      </button>
    </form>
  );
};

// ── Helpers (identiques à audit-form.tsx) ──────────────────────────

const inputCn = (hasError: boolean) =>
  cn(
    "w-full rounded-md border bg-background px-4 py-3",
    "text-sm text-foreground placeholder:text-muted-foreground/50",
    "outline-none transition-all",
    "focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10",
    hasError ? "border-red-500/60" : "border-border"
  );

const Field = ({
  label, required, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-foreground">
      {label}
      {required && <span className="ml-0.5 text-orange-500"> *</span>}
    </label>
    {children}
    {error && <p data-testid="field-error" className="text-xs text-red-400">{error}</p>}
  </div>
);