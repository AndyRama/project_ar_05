import {
  Layout, LayoutContent, LayoutHeader, LayoutTitle,
} from "@/features/page/layout";
import { prisma } from "@/lib/prisma";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const RETENTION_DAYS = 7;

function getAvailability(createdAt: Date) {
  const expiresAt = new Date(createdAt);
  expiresAt.setDate(expiresAt.getDate() + RETENTION_DAYS);

  const now = new Date();
  const msLeft = expiresAt.getTime() - now.getTime();
  const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));

  return { expiresAt, daysLeft, isExpired: daysLeft <= 0 };
}

export default async function MyMealPlansPage() {
  const user = await getRequiredUser();

  const documents = await prisma.mealPlanDocument.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Mes plans alimentaires</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        {documents.length === 0 ? (
          <div className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
            Ton coach ne t'a pas encore envoyé de plan alimentaire.
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => {
              const { daysLeft, isExpired } = getAvailability(doc.createdAt);

              return (
                <div key={doc.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium">{doc.fileName}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[11px] font-medium",
                            isExpired
                              ? "bg-red-500/10 text-red-500"
                              : "bg-orange-500/10 text-orange-500"
                          )}
                        >
                          {isExpired
                            ? "Expiré"
                            : `Disponible ${daysLeft}j`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(isExpired && "pointer-events-none")}
                  >
                    <Button variant="outline" size="sm" className="gap-2" disabled={isExpired}>
                      <Download className="size-4" />
                      Télécharger
                    </Button>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </LayoutContent>
    </Layout>
  );
}