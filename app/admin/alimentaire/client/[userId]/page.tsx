import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth/auth-user";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Calendar } from "lucide-react";
import type { PageParams } from "@/types/next";

type ClientHistoryPageProps = PageParams<{
  userId: string;
}>;

export default async function ClientHistoryPage({ params }: ClientHistoryPageProps) {
  const user = await getUser();
  
  if (!user) {
    redirect("/auth/signin");
  }

  const { userId } = await params;

  const client = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      alimentaireProfiles: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!client || client.alimentaireProfiles.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <Layout>
        <LayoutHeader>
          <div className="flex items-center gap-4">
            <Link href="/alimentaire">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="size-4" />
                Retour
              </Button>
            </Link>
            <div>
              <LayoutTitle>Historique des bilans — {client.name}</LayoutTitle>
              <p className="text-sm text-muted-foreground">{client.email}</p>
            </div>
          </div>
        </LayoutHeader>

        <LayoutContent>
          <div className="space-y-4">
            {client.alimentaireProfiles.map((profile, idx) => {
              const isFirst = idx === client.alimentaireProfiles.length - 1;
              return (
                <Card key={profile.id} className="border-orange-500/30">
                  <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent px-4">
                    <div className="flex items-center justify-between">
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
                      <Link href={`/alimentaire/${profile.id}`}>
                        <Button variant="outline" size="sm" className="gap-2 hover:bg-orange-50 hover:text-orange-600">
                          <Eye className="size-4" />
                          Voir le détail
                        </Button>
                      </Link>
                    </div>
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
        </LayoutContent>
      </Layout>
    </div>
  );
}