import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { ArrowLeft } from "lucide-react";
import { createDraftBilanAction } from "@/features/admin/bilan-detail/create-draft-action";

export default async function NewBilanPage() {
  const user = await getRequiredUser();

  const lastProfile = await prisma.alimentaireProfile.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Layout size="lg">
      <LayoutHeader>
        <div className="flex items-center gap-4">
          <Link href="/app/bilan">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="size-4" />
              Retour
            </Button>
          </Link>
          <LayoutTitle>Nouveau bilan mensuel</LayoutTitle>
        </div>
      </LayoutHeader>

      <LayoutContent className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-4">
          <Card className="flex items-center justify-center border-orange-500/30 lg:col-span-1">
            <CardContent className="flex items-center justify-center p-6">
              <img
                src="/images/logo-suivi-mensuel.jpg"
                alt="Team UNL Coaching"
                className="w-full max-w-[200px] object-contain"
              />
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 lg:col-span-3">
            <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
              <CardTitle className="px-2 text-orange-500">Commencer un nouveau bilan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {lastProfile ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    On part des valeurs de ton dernier bilan (
                    {new Date(lastProfile.createdAt).toLocaleDateString("fr-FR")}) — tu
                    pourras ajuster chaque section une par une une fois sur la page du
                    bilan en le modifiant.
                  </p>
                  <form action={createDraftBilanAction} className="mt-4">
                    <Button type="submit" className="gap-2 bg-orange-500 hover:bg-orange-400">
                      Crée un bilan
                    </Button>
                  </form>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucun bilan précédent trouvé. Contacte ton coach si ce n'est pas normal.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </LayoutContent>
    </Layout>
  );
}