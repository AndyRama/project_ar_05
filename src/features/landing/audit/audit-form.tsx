"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitAuditFormAction } from "./audit-form.action";
import type {
  AuditFormData} from "./audit-form.schema";
import {
  AuditFormSchema,
  Step1Schema,
  Step2Schema,
  Step3Schema,
} from "./audit-form.schema";

const STEPS = [
  { number: 1, label: "Coordonnées" },
  { number: 2, label: "Votre activité" },
  { number: 3, label: "Votre projet" },
] as const;

const BUDGETS = [
  "Moins de 500€",
  "500€ – 1 000€",
  "1 000€ – 3 000€",
  "Plus de 3 000€",
] as const;

export const AuditForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<AuditFormData>({
    resolver: zodResolver(AuditFormSchema),
    mode: "onTouched",
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      activity: "",
      city: "",
      website: "",
      goal: "",
      budget: "",
      message: "",
    },
  });

  const { register, trigger, handleSubmit, formState: { errors, isSubmitting } } = form;

  const goNext = async () => {
    const schema = step === 1 ? Step1Schema : step === 2 ? Step2Schema : Step3Schema;
    const fields = Object.keys(schema.shape) as (keyof AuditFormData)[];
    const ok = await trigger(fields);
    if (ok) setStep((s) => Math.min(s + 1, 3));
  };

  const onSubmit = async (data: AuditFormData) => {
    await submitAuditFormAction(data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="audit-form" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-xl px-6 text-center lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-10">
            <div className="mb-4 flex justify-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-orange-500/10">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Demande reçue !</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Je vous recontacte rapidement pour appel découverte et un plan alimentaire personnalisé .
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="audit-form" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-orange-700 uppercase dark:border-orange-800/60 dark:bg-orange-950/60 dark:text-orange-300">
            Commencer maintenant
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            Information Personnel
          </h2>
          <p className="mt-4 text-base text-muted-foreground text-balance">
            Remplissez ce formulaire en 5 minutes pour que je puisse élaborer programme alimentaire.
          </p>
        </div>

        {/* Card */}
        <div className="mx-auto mt-16 max-w-md">
          <div className="rounded-2xl border border-border bg-card p-8">

            {/* Stepper */}
            <div className="mb-8 flex items-center w-full">
              {/* Step 1 */}
              <div
                data-testid="step-indicator-1"
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all",
                  step === 1 ? "bg-orange-500 text-white" : step > 1 ? "bg-orange-500/30 text-orange-400" : "bg-muted text-muted-foreground"
                )}
              >1</div>

              {/* Ligne 1→2 */}
              <div className={cn("h-0.5 flex-1 transition-all", step > 1 ? "bg-orange-500/30" : "bg-border")} />

              {/* Step 2 */}
              <div
                data-testid="step-indicator-2"
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all",
                  step === 2 ? "bg-orange-500 text-white" : step > 2 ? "bg-orange-500/30 text-orange-400" : "bg-muted text-muted-foreground"
                )}
              >2</div>

              {/* Ligne 2→3 */}
              <div className={cn("h-0.5 flex-1 transition-all", step > 2 ? "bg-orange-500/30" : "bg-border")} />

              {/* Step 3 */}
              <div
                data-testid="step-indicator-3"
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all",
                  step === 3 ? "bg-orange-500 text-white" : step > 3 ? "bg-orange-500/30 text-orange-400" : "bg-muted text-muted-foreground"
                )}
              >3</div>
            </div>

            {/* Étape 1 */}
            {step === 1 && (
              <div data-testid="step-1" className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Prénom" required error={errors.firstname?.message}>
                    <input {...register("firstname")} placeholder="Votre prénom" className={inputCn(!!errors.firstname)} />
                  </Field>
                  <Field label="Nom" required error={errors.lastname?.message}>
                    <input {...register("lastname")} placeholder="Votre nom" className={inputCn(!!errors.lastname)} />
                  </Field>
                </div>
                <Field label="Téléphone" required error={errors.phone?.message}>
                  <input {...register("phone")} placeholder="+33 6 12 34 56 78" className={inputCn(!!errors.phone)} />
                </Field>
                <Field label="Email" required error={errors.email?.message}>
                  <input {...register("email")} type="email" placeholder="votre@email.fr" className={inputCn(!!errors.email)} />
                </Field>
                <NextBtn onClick={goNext} />
              </div>
            )}

            {/* Étape 2 */}
            {step === 2 && (
              <div data-testid="step-2" className="flex flex-col gap-5">
                <Field label="Votre activité" required error={errors.activity?.message}>
                  <input {...register("activity")} placeholder="Ex: Plombier, Dentiste, Restaurant…" className={inputCn(!!errors.activity)} />
                </Field>
                <Field label="Ville" required error={errors.city?.message}>
                  <input {...register("city")} placeholder="Votre ville" className={inputCn(!!errors.city)} />
                </Field>
                <Field label="Site web actuel" error={errors.website?.message}>
                  <input {...register("website")} placeholder="https://votre-site.fr (optionnel)" className={inputCn(!!errors.website)} />
                </Field>
                <div className="flex gap-3">
                  <BackBtn onClick={() => setStep(1)} />
                  <NextBtn onClick={goNext} />
                </div>
              </div>
            )}

            {/* Étape 3 */}
            {step === 3 && (
              <form data-testid="step-3" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <Field label="Votre objectif principal" required error={errors.goal?.message}>
                  <textarea {...register("goal")} rows={3} placeholder="Ex: Plus d'appels, plus de devis, meilleur classement Google…" className={inputCn(!!errors.goal)} />
                </Field>
                <Field label="Budget envisagé" required error={errors.budget?.message}>
                  <select {...register("budget")} className={inputCn(!!errors.budget)}>
                    <option value="">Sélectionnez…</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Message complémentaire" error={errors.message?.message}>
                  <textarea {...register("message")} rows={2} placeholder="Informations supplémentaires (optionnel)" className={inputCn(!!errors.message)} />
                </Field>
                <div className="flex gap-3">
                  <BackBtn onClick={() => setStep(2)} />
                  <button type="submit" disabled={isSubmitting} data-testid="submit-btn" className="flex-1 rounded-md bg-orange-500 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-400 disabled:opacity-60">
                    {isSubmitting ? "Envoi…" : "Réserver mon appel"}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

const inputCn = (hasError: boolean) =>
  cn(
    "w-full rounded-md border bg-background px-4 py-3",
    "text-sm text-foreground placeholder:text-muted-foreground/50",
    "outline-none transition-all",
    "focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10",
    hasError ? "border-red-500/60" : "border-border"
  );

const Field = ({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-foreground">
      {label}
      {required && <span className="ml-0.5 text-orange-500"> *</span>}
    </label>
    {children}
    {error && <p data-testid="field-error" className="text-xs text-red-400">{error}</p>}
  </div>
);

const NextBtn = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick} data-testid="next-btn" className="w-full rounded-md bg-orange-500 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-400 active:scale-95">
    Continuer 
  </button>
);

const BackBtn = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick} data-testid="back-btn" className="rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted">
    Retour
  </button>
);