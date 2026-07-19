"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MeasurementData = {
  leftArm?: number | null;
  rightArm?: number | null;
  shoulders?: number | null;
  chest?: number | null;
  waist?: number | null;
  glutes?: number | null;
  leftThigh?: number | null;
  rightThigh?: number | null;
  size?: number | null;
  weight?: number | null;
  age?: number | null;
  hoursActivityPerWeek?: string | null;
  stepsPerWeek?: string | null;
};

type MeasurementChartProps = MeasurementData;

export function MeasurementChart(props: MeasurementChartProps) {
  // Données pour le graphique radar (symétrie corporelle)
  const symmetryData = [
    {
      subject: 'Bras',
      gauche: props.leftArm || 0,
      droit: props.rightArm || 0,
      fullMark: 50,
    },
    {
      subject: 'Jambes',
      gauche: props.leftThigh || 0,
      droit: props.rightThigh || 0,
      fullMark: 80,
    },
  ];

  // Données pour le graphique de barres (mensurations)
  const measurementsData = [
    { name: 'Épaules', valeur: props.shoulders || 0 },
    { name: 'Poitrine', valeur: props.chest || 0 },
    { name: 'Taille', valeur: props.waist || 0 },
    { name: 'Fessiers', valeur: props.glutes || 0 },
    { name: 'Bras G', valeur: props.leftArm || 0 },
    { name: 'Bras D', valeur: props.rightArm || 0 },
    { name: 'Jambe G', valeur: props.leftThigh || 0 },
    { name: 'Jambe D', valeur: props.rightThigh || 0 },
  ].filter(item => item.valeur > 0);

  // Extraction des données d'activité
  const extractNumber = (str: string | null | undefined): number => {
    if (!str) return 0;
    const match = str.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const activityHours = extractNumber(props.hoursActivityPerWeek);
  const stepsPerWeek = extractNumber(props.stepsPerWeek);

  // Données d'activité pour graphique
  const activityData = [
    { name: 'Lun', heures: activityHours * 0.15, pas: stepsPerWeek * 0.14 },
    { name: 'Mar', heures: activityHours * 0.18, pas: stepsPerWeek * 0.16 },
    { name: 'Mer', heures: activityHours * 0.12, pas: stepsPerWeek * 0.13 },
    { name: 'Jeu', heures: activityHours * 0.16, pas: stepsPerWeek * 0.15 },
    { name: 'Ven', heures: activityHours * 0.14, pas: stepsPerWeek * 0.14 },
    { name: 'Sam', heures: activityHours * 0.15, pas: stepsPerWeek * 0.16 },
    { name: 'Dim', heures: activityHours * 0.10, pas: stepsPerWeek * 0.12 },
  ];

  // Calcul IMC et ratio taille/hanches
  const bmi = props.size && props.weight 
    ? (props.weight / Math.pow(props.size / 100, 2)).toFixed(1) 
    : null;
  
  const waistToHipRatio = props.waist && props.glutes 
    ? (props.waist / props.glutes).toFixed(2) 
    : null;

  if (measurementsData.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
        Aucune donnée disponible
      </div>
    );
  }

  return (
    <Tabs defaultValue="activity" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="activity">Activité</TabsTrigger>
        <TabsTrigger value="measurements">Mensurations</TabsTrigger>
        <TabsTrigger value="symmetry">Symétrie</TabsTrigger>
      </TabsList>

      {/* Graphique d'activité hebdomadaire */}
      <TabsContent value="activity" className="space-y-4">
        <Card className="border-orange-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-500">
              Activité hebdomadaire estimée
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorHeures" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #f97316',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="heures" 
                  stroke="#f97316" 
                  fillOpacity={1} 
                  fill="url(#colorHeures)"
                  name="Heures d'activité"
                />
                <Area 
                  type="monotone" 
                  dataKey="pas" 
                  stroke="#fb923c" 
                  fillOpacity={1} 
                  fill="url(#colorPas)"
                  name="Pas (milliers)"
                />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Stats rapides */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3">
                <p className="text-xs text-muted-foreground">Total hebdo</p>
                <p className="text-lg font-bold text-orange-500">
                  {activityHours}h
                </p>
              </div>
              <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3">
                <p className="text-xs text-muted-foreground">Pas / semaine</p>
                <p className="text-lg font-bold text-orange-500">
                  {stepsPerWeek.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Graphique des mensurations */}
      <TabsContent value="measurements" className="space-y-4">
        <Card className="border-orange-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-500">
              Mensurations corporelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={measurementsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #f97316',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="valeur" fill="#f97316" radius={[8, 8, 0, 0]} name="Circonférence (cm)" />
              </BarChart>
            </ResponsiveContainer>

            {/* Indicateurs santé */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {bmi && (
                <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3">
                  <p className="text-xs text-muted-foreground">IMC</p>
                  <p className="text-lg font-bold text-orange-500">{bmi}</p>
                  <p className="text-xs text-muted-foreground">
                    {parseFloat(bmi) < 18.5 ? 'Insuffisance' : 
                     parseFloat(bmi) < 25 ? 'Normal' : 
                     parseFloat(bmi) < 30 ? 'Surpoids' : 'Obésité'}
                  </p>
                </div>
              )}
              {waistToHipRatio && (
                <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3">
                  <p className="text-xs text-muted-foreground">Ratio T/H</p>
                  <p className="text-lg font-bold text-orange-500">{waistToHipRatio}</p>
                  <p className="text-xs text-muted-foreground">
                    {parseFloat(waistToHipRatio) < 0.85 ? 'Bon' : 'À surveiller'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Graphique de symétrie */}
      <TabsContent value="symmetry" className="space-y-4">
        <Card className="border-orange-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-500">
              Symétrie corporelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={symmetryData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" stroke="#888" />
                <PolarRadiusAxis stroke="#888" />
                <Radar 
                  name="Côté gauche" 
                  dataKey="gauche" 
                  stroke="#f97316" 
                  fill="#f97316" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="Côté droit" 
                  dataKey="droit" 
                  stroke="#fb923c" 
                  fill="#fb923c" 
                  fillOpacity={0.6} 
                />
                <Legend />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #f97316',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>

            {/* Analyse symétrie */}
            <div className="mt-4 space-y-2">
              {props.leftArm && props.rightArm && (
                <SymmetryIndicator 
                  label="Bras" 
                  left={props.leftArm} 
                  right={props.rightArm} 
                />
              )}
              {props.leftThigh && props.rightThigh && (
                <SymmetryIndicator 
                  label="Jambes" 
                  left={props.leftThigh} 
                  right={props.rightThigh} 
                />
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// Composant pour indiquer la symétrie
function SymmetryIndicator({ 
  label, 
  left, 
  right 
}: { 
  label: string; 
  left: number; 
  right: number; 
}) {
  const difference = Math.abs(left - right);
  const percentDiff = ((difference / Math.max(left, right)) * 100).toFixed(1);
  const isSymmetric = difference <= 1;

  return (
    <div className="flex items-center justify-between rounded-lg border border-orange-500/20 bg-orange-500/5 p-2">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {left} cm / {right} cm
        </span>
        <span className={`text-xs font-semibold ${isSymmetric ? 'text-green-500' : 'text-yellow-500'}`}>
          {isSymmetric ? '✓ Symétrique' : `±${percentDiff}%`}
        </span>
      </div>
    </div>
  );
}