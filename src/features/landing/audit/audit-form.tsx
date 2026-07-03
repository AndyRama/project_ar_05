"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { AuditFormData } from "./audit-form.schema";
import {
  AuditFormSchema,
  Step1Schema,
  Step2Schema,
  Step3Schema,
  PLANS,
} from "./audit-form.schema";
import { submitAuditFormAction } from "./audit-form.action";

export const AuditForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AuditFormData>({
    resolver: zodResolver(AuditFormSchema),
    mode: "onTouched",
    defaultValues: {
      plan: undefined,
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      age: "",
      profession: "",
      pathology: "",
      hoursActivityPerWeek: "",
      stepsPerWeek: "",
      sleepHours: "",
      leftArm: "",
      rightArm: "",
      glutes: "",
      leftThigh: "",
      rightThigh: "",
      shoulders: "",
      chest: "",
      waist: "",
    },
  });

  const { register, trigger, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = form;

  const selectedPlan = watch("plan");

  const goNext = async () => {
    const schema = step === 1 ? Step1Schema : step === 2 ? Step2Schema : Step3Schema;
    const fields = Object.keys(schema.shape) as (keyof AuditFormData)[];
    const ok = await trigger(fields);
    if (ok) setStep((s) => Math.min(s + 1, 3));
  };

  const onSubmit = async (data: AuditFormData) => {
    setError(null);
    try {
      await submitAuditFormAction(data);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <div className="rounded-md border border-border bg-card p-10">
          <div className="mb-4 flex justify-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-orange-500/10">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-foreground">Demande reçue !</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Je vous recontacte rapidement pour votre appel de découverte et un plan alimentaire personnalisé.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">
              Dernière étape — créez votre compte pour accéder à votre espace membre.
            </p>
            <Link
              href="/auth/signin"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-400 active:scale-95"
            >
              <User className="h-4 w-4" />
              Créer mon compte
            </Link>
            <span className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              Connexion via lien magique par email ou Google
              <span className="h-px flex-1 bg-border" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  const stepLabels = ["Coordonnées", "Profil & activité", "Mensurations"];

  return (
    <div className="py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-orange-700 uppercase dark:border-orange-800/60 dark:bg-orange-950/60 dark:text-orange-300">
          Commencer maintenant
        </span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Informations personnelles
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Remplissez ce formulaire pour que je puisse élaborer votre programme.
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center w-full">
            {[1, 2, 3].map((n, idx) => (
              <>
                <div
                  key={n}
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all",
                    step === n ? "bg-orange-500 text-white" :
                    step > n  ? "bg-orange-500/30 text-orange-400" :
                                "bg-muted text-muted-foreground"
                  )}
                >{n}</div>
                {idx < 2 && (
                  <div className={cn("h-0.5 flex-1 transition-all", step > n ? "bg-orange-500/30" : "bg-border")} />
                )}
              </>
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            {stepLabels.map((label, idx) => (
              <span key={idx} className={cn("text-xs transition-all", step === idx + 1 ? "text-orange-500 font-semibold" : "text-muted-foreground")}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Étape 1 — Coordonnées */}
        {step === 1 && (
          <div data-testid="step-1" className="flex flex-col gap-5">
            <Field label="Plan choisi" required error={errors.plan?.message}>
              <div className="flex flex-col gap-2">
                {PLANS.map((plan) => (
                  <button
                    key={plan.value}
                    type="button"
                    data-testid={`plan-${plan.value}`}
                    onClick={() => setValue("plan", plan.value, { shouldValidate: true })}
                    className={cn(
                      "flex items-center justify-between rounded-md border px-4 py-3 text-left transition-all",
                      selectedPlan === plan.value
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-950/40"
                        : "border-border bg-background hover:border-orange-300"
                    )}
                  >
                    <span className="text-sm font-semibold text-foreground">{plan.label}</span>
                    <span
                      className={cn(
                        "text-sm font-bold",
                        selectedPlan === plan.value ? "text-orange-600" : "text-muted-foreground"
                      )}
                    >
                      {plan.price}
                    </span>
                  </button>
                ))}
              </div>
            </Field>
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

        {/* Étape 2 — Profil & activité */}
        {step === 2 && (
          <div data-testid="step-2" className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Âge" required error={errors.age?.message}>
                <input {...register("age")} type="number" placeholder="Ex: 28" className={inputCn(!!errors.age)} />
              </Field>
              <Field label="Profession" required error={errors.profession?.message}>
                <input {...register("profession")} placeholder="Ex: Infirmière" className={inputCn(!!errors.profession)} />
              </Field>
            </div>
            <Field label="Pathologie / maladie" error={errors.pathology?.message}>
              <textarea {...register("pathology")} rows={2} placeholder="Aucune ou décrivez vos conditions médicales" className={inputCn(!!errors.pathology)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Heures d'activité / semaine" required error={errors.hoursActivityPerWeek?.message}>
                <input {...register("hoursActivityPerWeek")} placeholder="Ex: 15-20h" className={inputCn(!!errors.hoursActivityPerWeek)} />
              </Field>
              <Field label="Pas par semaine" required error={errors.stepsPerWeek?.message}>
                <input {...register("stepsPerWeek")} placeholder="Ex: ~12 000" className={inputCn(!!errors.stepsPerWeek)} />
              </Field>
            </div>
            <Field label="Heures de sommeil" required error={errors.sleepHours?.message}>
              <textarea {...register("sleepHours")} rows={2} placeholder="Ex: 5h30-6h les jours salle, 7h30-9h les autres jours" className={inputCn(!!errors.sleepHours)} />
            </Field>
            <div className="flex gap-3">
              <BackBtn onClick={() => setStep(1)} />
              <NextBtn onClick={goNext} />
            </div>
          </div>
        )}

        {/* Étape 3 — Mensurations */}
        {step === 3 && (
          <form data-testid="step-3" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <p className="text-xs text-muted-foreground rounded-lg bg-muted/50 px-3 py-2">
              📏 Toutes les mesures sont en centimètres
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bras gauche (cm)" required error={errors.leftArm?.message}>
                <input {...register("leftArm")} type="number" step="0.1" placeholder="Ex: 32.5" className={inputCn(!!errors.leftArm)} />
              </Field>
              <Field label="Bras droit (cm)" required error={errors.rightArm?.message}>
                <input {...register("rightArm")} type="number" step="0.1" placeholder="Ex: 33" className={inputCn(!!errors.rightArm)} />
              </Field>
              <Field label="Fessiers (cm)" required error={errors.glutes?.message}>
                <input {...register("glutes")} type="number" step="0.1" placeholder="Ex: 95" className={inputCn(!!errors.glutes)} />
              </Field>
              <Field label="Jambe gauche (cm)" required error={errors.leftThigh?.message}>
                <input {...register("leftThigh")} type="number" step="0.1" placeholder="Ex: 55" className={inputCn(!!errors.leftThigh)} />
              </Field>
              <Field label="Jambe droite (cm)" required error={errors.rightThigh?.message}>
                <input {...register("rightThigh")} type="number" step="0.1" placeholder="Ex: 55.5" className={inputCn(!!errors.rightThigh)} />
              </Field>
              <Field label="Épaules (cm)" required error={errors.shoulders?.message}>
                <input {...register("shoulders")} type="number" step="0.1" placeholder="Ex: 110" className={inputCn(!!errors.shoulders)} />
              </Field>
              <Field label="Poitrine (cm)" required error={errors.chest?.message}>
                <input {...register("chest")} type="number" step="0.1" placeholder="Ex: 88" className={inputCn(!!errors.chest)} />
              </Field>
              <Field label="Taille (cm)" required error={errors.waist?.message}>
                <input {...register("waist")} type="number" step="0.1" placeholder="Ex: 72" className={inputCn(!!errors.waist)} />
              </Field>
            </div>

            {error && (
              <p data-testid="submit-error" className="text-sm text-red-400">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <BackBtn onClick={() => setStep(2)} />
              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="submit-btn"
                className="flex-1 rounded-md bg-orange-500 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-400 disabled:opacity-60"
              >
                {isSubmitting ? "Envoi…" : "Envoyer mon formulaire"}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

// ── Helpers ───────────────────────────────────────────────────────

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

const NextBtn = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick} data-testid="next-btn"
    className="w-full rounded-md bg-orange-500 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-400 active:scale-95">
    Continuer →
  </button>
);

const BackBtn = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick} data-testid="back-btn"
    className="rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted">
    Retour
  </button>
);