"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type WeightProgressChartProps = {
  data: { date: string; poids: number }[];
};

const chartConfig = {
  poids: {
    label: "Poids (kg)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function WeightProgressChart({ data }: WeightProgressChartProps) {
  if (data.length < 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Évolution du poids</CardTitle>
          <CardDescription>
            Il faut au moins 2 bilans pour afficher une courbe de progression
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const first = data[0].poids;
  const last = data[data.length - 1].poids;
  const diff = +(last - first).toFixed(1);
  const isDown = diff < 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution du poids</CardTitle>
        <CardDescription>
          Poids enregistré à chaque bilan depuis le début du suivi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-64 w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillPoids" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-poids)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-poids)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="poids"
              type="natural"
              fill="url(#fillPoids)"
              fillOpacity={0.4}
              stroke="var(--color-poids)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {diff === 0
                ? "Poids stable depuis le premier bilan"
                : `${isDown ? "En baisse" : "En hausse"} de ${Math.abs(diff)} kg depuis le premier bilan`}
              {diff !== 0 && (isDown ? <TrendingDown className="size-4" /> : <TrendingUp className="size-4" />)}
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {data[0].date} — {data[data.length - 1].date}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}