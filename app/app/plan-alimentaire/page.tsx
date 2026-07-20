import {
  Layout, LayoutContent, LayoutHeader, LayoutTitle,
} from "@/features/page/layout";
import { prisma } from "@/lib/prisma";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

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
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">{doc.fileName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="size-4" />
                    Télécharger
                  </Button>
                </a>
              </div>
            ))}
          </div>
        )}
      </LayoutContent>
    </Layout>
  );
}