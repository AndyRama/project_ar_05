import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getResendUsage } from "@/lib/mail/resend-usage";
import { cn } from "@/lib/utils";

export const MailUsageCard = async () => {
  const usage = await getResendUsage();
  const isCritical = usage.percentUsed >= 90;
  const isWarning = usage.percentUsed >= 70;

  const resetDateLabel = new Date(usage.resetDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });

  return (
    <Card className="border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-sm text-orange-500">Emails Resend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium">
            {usage.sentThisMonth.toLocaleString("fr-FR")} envoyés / {usage.limit.toLocaleString("fr-FR")}
          </span>
          <span className={cn(
            "font-semibold",
            isCritical ? "text-red-500" : isWarning ? "text-yellow-500" : "text-green-500"
          )}>
            {usage.remaining.toLocaleString("fr-FR")} restants
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full transition-all",
              isCritical ? "bg-red-500" : isWarning ? "bg-yellow-500" : "bg-orange-500"
            )}
            style={{ width: `${usage.percentUsed}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Réinitialisation le {resetDateLabel}
        </p>
        {isWarning && (
          <p className="text-xs text-muted-foreground">
            {isCritical
              ? "⚠️ Quota email presque épuisé — les envois risquent d'être bloqués."
              : "Pense à surveiller le volume d'envoi pour ne pas dépasser le quota."}
          </p>
        )}
      </CardContent>
    </Card>
  );
};