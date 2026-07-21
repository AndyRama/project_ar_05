import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  LayoutActions,
} from "@/features/page/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getRequiredUser } from "@/lib/auth/auth-user";
import Link from "next/link";
import { Calendar, Plus } from "lucide-react";

export default async function MyBilansPage() {
  const user = await getRequiredUser();

  const profiles = await prisma.alimentaireProfile.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Mes bilans</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link href="/app/bilan/nouveau">
          <Button className="gap-2 bg-orange-500 hover:bg-orange-400">
            <Plus className="size-4" />
            Nouveau bilan
          </Button>
        </Link>
      </LayoutActions>

      <LayoutActions>  
        <Link href="/app/plan-alimentaire">
          <Button className="gap-2 bg-orange-500 hover:bg-orange-400">
            <Plus className="size-4" />
            Plan PDF
          </Button>
        </Link>
      </LayoutActions>

      <LayoutContent>
        {profiles.length === 0 ? (
          <div className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
            Aucun bilan enregistré pour le moment.
          </div>
        ) : (
          <div className="space-y-4">
            {profiles.map((profile, idx) => {
              const isFirst = idx === profiles.length - 1;
              return (
                <Card key={profile.id} className="border-orange-500/30">
                  <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent px-4">
                    <CardTitle className="flex items-center gap-2 px-2 text-orange-500">
                      <Calendar className="size-4" />
                      {new Date(profile.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {isFirst && (
                        <span className="ml-2 rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-semibold text-orange-600">
                          Bilan initial
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                      <div>
                        <p className="text-muted-foreground">Poids</p>
                        <p className="font-semibold">{profile.weight} kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Taille</p>
                        <p className="font-semibold">{profile.size} cm</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tour de taille</p>
                        <p className="font-semibold">{profile.waist ?? "N/A"} cm</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Activité / semaine</p>
                        <p className="font-semibold">{profile.hoursActivityPerWeek ?? "N/A"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </LayoutContent>
    </Layout>
  );
}