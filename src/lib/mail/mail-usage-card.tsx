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

  const remainingColor = isCritical
    ? "text-red-400"
    : isWarning
      ? "text-amber-400"
      : "text-emerald-400";

  return (
    <div className="rounded-xl border border-sky-900/40 bg-zinc-900/60 p-5">
      <h3 className="text-sm font-semibold text-sky-400">Emails (Resend)</h3>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-zinc-300">
          {sentThisMonth.toLocaleString("fr-FR")} envoyés / {limit.toLocaleString("fr-FR")}
        </p>
        <span className={`text-sm font-medium ${remainingColor}`}>
          {remaining.toLocaleString("fr-FR")} restants
        </span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${percentUsed}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
        <span>{percentUsed.toFixed(1)}% utilisé</span>
        <span>Réinitialisation le {formatResetDate(resetDate)}</span>
      </div>
    </div>
  );
}