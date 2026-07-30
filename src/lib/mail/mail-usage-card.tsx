import { getResendUsage } from "./resend-usage";

function formatResetDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
}

export async function MailUsageCard() {
  const { sentThisMonth, limit, remaining, percentUsed, resetDate } =
    await getResendUsage();

  const isWarning = percentUsed >= 75 && percentUsed < 90;
  const isCritical = percentUsed >= 90;

  const barColor = isCritical
    ? "bg-red-500"
    : isWarning
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-neutral-500">Emails (Resend)</h3>
        <span className="text-xs text-neutral-400">
          Réinitialisation le {formatResetDate(resetDate)}
        </span>
      </div>

      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-neutral-900">
          {sentThisMonth.toLocaleString("fr-FR")}
        </span>
        <span className="text-sm text-neutral-400">/ {limit.toLocaleString("fr-FR")} envoyés ce mois-ci</span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${percentUsed}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-neutral-400">
        {remaining.toLocaleString("fr-FR")} emails restants ({percentUsed.toFixed(1)}% utilisé)
      </p>
    </div>
  );
}