import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  LayoutDescription,
  LayoutActions,
} from "@/features/page/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getRequiredAdmin } from "@/lib/auth/auth-user";
import Link from "next/link";
import { Eye, Users, Calendar, TrendingUp, Activity, ExternalLink, File } from "lucide-react";
import type { Prisma } from "@/generated/prisma";

// Type pour un client avec tous ses bilans
type UserWithProfiles = Prisma.UserGetPayload<{
  include: {
    alimentaireProfiles: true;
  };
}>;

const truncateText = (text: string | null, maxLength = 30): string => {
  if (!text) return "N/A";
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

const getProfilesThisWeek = (users: UserWithProfiles[]): number => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return users.reduce((acc, u) => {
    return acc + u.alimentaireProfiles.filter(
      (p) => new Date(p.createdAt) >= oneWeekAgo
    ).length;
  }, 0);
};

const getAverageActivity = (latestProfiles: UserWithProfiles["alimentaireProfiles"]): string => {
  const withActivity = latestProfiles.filter((p) => p.hoursActivityPerWeek);
  if (withActivity.length === 0) return "N/A";

  const totalHours = withActivity.reduce((acc, p) => {
    const match = p.hoursActivityPerWeek?.match(/\d+/);
    return acc + (match ? parseInt(match[0]) : 0);
  }, 0);

  return `${Math.round(totalHours / withActivity.length)}h`;
};

export default async function AdminPage() {
  await getRequiredAdmin();

  let usersWithProfiles: UserWithProfiles[] = [];

  try {
    usersWithProfiles = await prisma.user.findMany({
      where: {
        alimentaireProfiles: { some: {} },
      },
      include: {
        alimentaireProfiles: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    usersWithProfiles.sort((a, b) => {
      const aLatest = a.alimentaireProfiles[0]?.createdAt ?? new Date(0);
      const bLatest = b.alimentaireProfiles[0]?.createdAt ?? new Date(0);
      return new Date(bLatest).getTime() - new Date(aLatest).getTime();
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Erreur lors de la récupération des profils alimentaires:", error);
  }

  const latestProfiles = usersWithProfiles
    .map((u) => u.alimentaireProfiles[0])
    .filter(Boolean);

  const totalBilans = usersWithProfiles.reduce(
    (acc, u) => acc + u.alimentaireProfiles.length,
    0
  );

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Tableau de bord</LayoutTitle>
        <LayoutDescription>Gestion des utilisateurs</LayoutDescription>
      </LayoutHeader>
      <LayoutActions>
        <Link href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer">
          <Button className="gap-2 bg-orange-500 hover:bg-orange-400">
            <ExternalLink className="size-4" />
            Voir Stripe
          </Button>
        </Link>
      </LayoutActions>

      <LayoutContent>
        {/* Statistiques */}
        {usersWithProfiles.length > 0 && (
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="py-2 text-sm font-medium">
                  Clients suivis
                </CardTitle>
                <Users className="size-4 py-2 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {usersWithProfiles.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {totalBilans} bilan{totalBilans > 1 ? "s" : ""} au total
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="py-2 text-sm font-medium">
                  Cette semaine
                </CardTitle>
                <Calendar className="size-4 py-2 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {getProfilesThisWeek(usersWithProfiles)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Nouveaux bilans
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Âge moyen
                </CardTitle>
                <TrendingUp className="size-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(
                    latestProfiles.reduce((acc, p) => acc + p.age, 0) /
                      latestProfiles.length
                  )}{" "}
                  ans
                </div>
                <p className="text-xs text-muted-foreground">
                  Moyenne d'âge des clients
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Activité moyenne
                </CardTitle>
                <Activity className="size-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {getAverageActivity(latestProfiles)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Par semaine (dernier bilan)
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tableau — un client par ligne */}
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Nom</TableHead>
                <TableHead className="w-[200px]">Email</TableHead>
                <TableHead className="w-[80px]">Âge</TableHead>
                <TableHead className="w-[150px]">Profession</TableHead>
                <TableHead className="w-[100px] text-center">Bilans</TableHead>
                <TableHead className="w-[140px]">Dernier bilan</TableHead>
                <TableHead className="w-[120px] text-center">Actions</TableHead>
                <TableHead className="w-[90px] text-center">Plan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersWithProfiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                    Aucun client avec bilan alimentaire disponible
                  </TableCell>
                </TableRow>
              ) : (
                usersWithProfiles.map((u) => {
                  const latest = u.alimentaireProfiles[0];
                  return (
                    <TableRow key={u.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium" title={u.name ?? "N/A"}>
                        {truncateText(u.name ?? "N/A", 20)}
                      </TableCell>
                      <TableCell title={u.email ?? "N/A"}>
                        {truncateText(u.email ?? "N/A", 25)}
                      </TableCell>
                      <TableCell>{latest.age} ans</TableCell>
                      <TableCell title={latest.profession ?? "N/A"}>
                        {truncateText(latest.profession ?? "N/A", 20)}
                      </TableCell>
                      <TableCell className="text-center font-semibold text-orange-600">
                        {u.alimentaireProfiles.length}
                      </TableCell>
                      <TableCell>
                        {new Date(latest.createdAt).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell className="text-center">
                        <Link href={`/admin/alimentaire/client/${u.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 hover:bg-orange-50 hover:text-orange-600"
                          >
                            <Eye className="size-4" />
                            Historique
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center">
                        <Link href={`/admin/alimentaire/pdf/${u.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 hover:bg-orange-50 hover:text-orange-600"
                          >
                            <File className="size-4" />
                             Pdf
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </LayoutContent>
    </Layout>
  );
}