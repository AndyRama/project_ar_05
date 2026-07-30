import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStorageUsage } from "@/lib/files/storage-usage";
import { cn } from "@/lib/utils";

const formatMb = (bytes: number) => (bytes / (1024 * 1024)).toFixed(1);
const formatGb = (bytes: number) => (bytes / (1024 * 1024 * 1024)).toFixed(2);

export const StorageUsageCard = async () => {
  const usage = await getStorageUsage();
  const isCritical = usage.percentUsed >= 90;
  const isWarning = usage.percentUsed >= 70;

  return (
    <Card className="border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-sm text-orange-500">Stockage UploadThing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium">
            {formatGb(usage.usedBytes)} Go utilisés / {formatGb(usage.limitBytes)} Go
          </span>
          <span className={cn(
            "font-semibold",
            isCritical ? "text-red-500" : isWarning ? "text-yellow-500" : "text-green-500"
          )}>
            {formatGb(usage.remainingBytes)} Go restants
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
        {isWarning && (
          <p className="text-xs text-muted-foreground">
            {isCritical
              ? "⚠️ Stockage presque plein — supprime des fichiers pour éviter un blocage."
              : "Pense à nettoyer les vieux fichiers pour limiter les coûts."}
          </p>
        )}

        {usage.largestFiles.length > 0 && (
          <details className="mt-2">
            <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
              Voir les fichiers les plus volumineux
            </summary>
            <div className="mt-2 space-y-1">
              {usage.largestFiles.map((f) => (
                <div key={f.key} className="flex items-center justify-between text-xs">
                  <span className="truncate">{f.name}</span>
                  <span className="ml-2 shrink-0 text-muted-foreground">{formatMb(f.size)} Mo</span>
                </div>
              ))}
            </div>
          </details>
        )}
      </CardContent>
    </Card>
  );
};