import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/helper";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { PageParams } from "@/types/next";
import { MeasurementChart } from "./MeasurementChart";

type AlimentaireDetailPageProps = PageParams<{
  profileId: string;
}>;

export default async function AlimentaireDetailPage({
  params
}: AlimentaireDetailPageProps) {
  // Vérification de l'authentification
  const user = await auth();

  if (!user?.id) {
    redirect("/auth/signin");
  }

  const { profileId } = await params;

  // Récupération du profil avec les données utilisateur
  const profile = await prisma.alimentaireProfile.findUnique({
    where: {
      id: profileId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!profile) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl p-4">
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
              <LayoutTitle>Détails du profil alimentaire</LayoutTitle>
            </div>
          </div>
        </LayoutHeader>

        <LayoutContent className="space-y-6">
          {/* Première ligne : Infos générales (1/3) + Statistiques (2/3) */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Informations générales - 1/3 - EN COLONNE */}
            <Card className="border-orange-500">
              <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent px-4">
                <CardTitle className="px-6 text-orange-500">Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-6">
                  <InfoItem label="Nom - Prénoms" value={profile.user?.name || 'N/A'} />
                  <InfoItem label="Âge" value={`${profile.age} ans`} />
                  <InfoItem label="Profession" value={profile.profession || 'N/A'} />
                  <InfoItem label="Date d'inscription" value={new Date(profile.createdAt).toLocaleDateString('fr-FR')} />
                </div>
              </CardContent>
            </Card>

            {/* Statistiques d'entraînement - 2/3 */}
            <Card className="border-orange-500 lg:col-span-2">
              <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent px-4">
                <CardTitle className="px-6 text-orange-500">Statistiques d'entraînement</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <MeasurementChart
                  leftArm={profile.leftArm}
                  rightArm={profile.rightArm}
                  shoulders={profile.shoulders}
                  chest={profile.chest}
                  waist={profile.waist}
                  glutes={profile.glutes}
                  leftThigh={profile.leftThigh}
                  rightThigh={profile.rightThigh}
                  size={profile.size}
                  weight={profile.weight}
                  age={profile.age}
                  hoursActivityPerWeek={profile.hoursActivityPerWeek}
                  stepsPerWeek={profile.stepsPerWeek}
                />
              </CardContent>
            </Card>
          </div>

          {/* Pathologie + Sommeil - MÊME LARGEUR que la ligne au-dessus */}
          {(profile.pathology || profile.sleepHours) && (
            <Card className="border-orange-500">
              <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent px-4">
                <CardTitle className="px-6 text-orange-500">Pathologie & Sommeil</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {profile.pathology && (
                    <div>
                      <p className="mb-2 text-sm font-medium text-muted-foreground">Pathologie / Conditions médicales</p>
                      <p className="whitespace-pre-wrap text-sm">{profile.pathology}</p>
                    </div>
                  )}
                  {profile.sleepHours && (
                    <div>
                      <p className="mb-2 text-sm font-medium text-muted-foreground">Habitudes de sommeil</p>
                      <p className="whitespace-pre-wrap text-sm">{profile.sleepHours}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activité physique */}
          <Card className="border-orange-500">
            <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent px-4">
              <CardTitle className="px-6 text-orange-500">Activité physique</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <InfoItem label="Heures d'activité / semaine" value={profile.hoursActivityPerWeek || 'N/A'} />
                <InfoItem label="Pas / semaine" value={profile.stepsPerWeek || 'N/A'} />
              </div>
            </CardContent>
          </Card>

          {/* Mensurations */}
          <Card className="border-orange-500">
            <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent px-4">
              <CardTitle className="px-6 text-orange-500">Mensurations corporelles</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Mesures principales */}
                <div className="grid gap-4 md:grid-cols-2">
                  <MeasurementBox label="Taille" value={profile.size} unit="cm" />
                  <MeasurementBox label="Poids" value={profile.weight} unit="kg" />
                </div>

                {/* Mesures détaillées */}
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {profile.leftArm && <MeasurementItem label="Bras gauche" value={profile.leftArm} />}
                  {profile.rightArm && <MeasurementItem label="Bras droit" value={profile.rightArm} />}
                  {profile.shoulders && <MeasurementItem label="Épaules" value={profile.shoulders} />}
                  {profile.chest && <MeasurementItem label="Poitrine" value={profile.chest} />}
                  {profile.waist && <MeasurementItem label="Taille" value={profile.waist} />}
                  {profile.glutes && <MeasurementItem label="Fessiers" value={profile.glutes} />}
                  {profile.leftThigh && <MeasurementItem label="Jambe gauche" value={profile.leftThigh} />}
                  {profile.rightThigh && <MeasurementItem label="Jambe droite" value={profile.rightThigh} />}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dernière mise à jour */}
          <div className="text-center text-sm text-muted-foreground">
            Dernière mise à jour le{' '}
            {new Date(profile.updatedAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </LayoutContent>
      </Layout>
    </div>
  );
}

// Composant pour afficher une information simple
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

// Composant pour les mesures principales (taille/poids)
function MeasurementBox({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold text-orange-500">
        {value} <span className="text-base font-normal">{unit}</span>
      </p>
    </div>
  );
}

// Composant pour afficher une mesure détaillée
function MeasurementItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border p-3">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-base font-semibold">
        {value} <span className="text-sm font-normal text-muted-foreground">cm</span>
      </p>
    </div>
  );
}