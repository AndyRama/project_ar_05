import {
  Layout, LayoutContent, LayoutHeader, LayoutTitle,
} from "@/features/page/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getRequiredAdmin } from "@/lib/auth/auth-user";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { MealPlanUpload } from "@/features/admin/meal-plans/meal-plan-upload";
import type { PageParams } from "@/types/next";

type Props = PageParams<{ userId: string }>;

export default async function AdminClientMealPlanPage({ params }: Props) {
  await getRequiredAdmin();
  const { userId } = await params;

  const client = await prisma.user.findUnique({
    where: { id: userId },
    include: { mealPlanDocuments: { orderBy: { createdAt: "desc" } } },
  });

  if (!client) notFound();

  return (
    <Layout>
      <LayoutHeader>
        <div className="flex items-center gap-4">
          <Link href="/admin/alimentaire">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="size-4" />
              Retour
            </Button>
          </Link>
          <div>
            <LayoutTitle>Plans alimentaires — {client.name}</LayoutTitle>
            <p className="text-sm text-muted-foreground">{client.email}</p>
          </div>
        </div>
      </LayoutHeader>

      <LayoutContent className="space-y-6">
        <Card className="border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-sm text-orange-500">Envoyer un nouveau plan</CardTitle>
          </CardHeader>
          <CardContent>
            <MealPlanUpload userId={client.id} />
          </CardContent>
        </Card>

        <div className="space-y-3">
          {client.mealPlanDocuments.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun plan envoyé pour l'instant.</p>
          ) : (
            client.mealPlanDocuments.map((doc) => (
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
                    Ouvrir
                  </Button>
                </a>
              </div>
            ))
          )}
        </div>
      </LayoutContent>
    </Layout>
  );
}