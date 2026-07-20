"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProfileHistoryItem = {
  createdAt: Date;
  weight: number;
  waist: number | null;
  chest: number | null;
  glutes: number | null;
  leftArm: number | null;
  rightArm: number | null;
  leftThigh: number | null;
  rightThigh: number | null;
};

type ProgressChartProps = {
  profiles: ProfileHistoryItem[];
};

export function ProgressChart({ profiles }: ProgressChartProps) {
  if (profiles.length < 2) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
        Il faut au moins 2 bilans pour afficher une courbe de progression.
      </div>
    );
  }

  // Les profils arrivent triés du plus récent au plus ancien (comme la liste)
  // → on les remet dans l'ordre chronologique pour le graphique
  const chronological = [...profiles].reverse();

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });

  const weightData = chronological.map((p) => ({
    date: formatDate(p.createdAt),
    Poids: p.weight,
  }));

  const measurementsData = chronological.map((p) => ({
    date: formatDate(p.createdAt),
    "Tour de taille": p.waist,
    Poitrine: p.chest,
    Fessiers: p.glutes,
  }));

  const symmetryData = chronological.map((p) => ({
    date: formatDate(p.createdAt),
    "Bras gauche": p.leftArm,
    "Bras droit": p.rightArm,
    "Jambe gauche": p.leftThigh,
    "Jambe droite": p.rightThigh,
  }));

  const tooltipStyle = {
    backgroundColor: "#1a1a1a",
    border: "1px solid #f97316",
    borderRadius: "8px",
  };

  return (
    <Tabs defaultValue="weight" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="weight">Poids</TabsTrigger>
        <TabsTrigger value="measurements">Mensurations</TabsTrigger>
        <TabsTrigger value="symmetry">Bras & jambes</TabsTrigger>
      </TabsList>

      <TabsContent value="weight">
        <Card className="border-orange-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-500">
              Évolution du poids (kg)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" domain={["auto", "auto"]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Poids"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ fill: "#f97316" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="measurements">
        <Card className="border-orange-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-500">
              Évolution des mensurations (cm)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={measurementsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" domain={["auto", "auto"]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Line type="monotone" dataKey="Tour de taille" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="Poitrine" stroke="#fb923c" strokeWidth={2} />
                <Line type="monotone" dataKey="Fessiers" stroke="#fdba74" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="symmetry">
        <Card className="border-orange-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-500">
              Évolution bras & jambes (cm)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={symmetryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" domain={["auto", "auto"]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Line type="monotone" dataKey="Bras gauche" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="Bras droit" stroke="#fb923c" strokeWidth={2} />
                <Line type="monotone" dataKey="Jambe gauche" stroke="#c2410c" strokeWidth={2} strokeDasharray="4 2" />
                <Line type="monotone" dataKey="Jambe droite" stroke="#ea580c" strokeWidth={2} strokeDasharray="4 2" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}