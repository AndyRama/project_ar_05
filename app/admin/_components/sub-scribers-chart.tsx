"use client";

const SUBSCRIBERS: { date: string; amount: number }[] = [
  { date: "2025-05-02", amount: 0 },
  { date: "2025-06-02", amount: 5 },
  { date: "2025-07-02", amount: 10 },
  { date: "2025-08-02", amount: 15 },
  { date: "2025-09-02", amount: 20 },
  { date: "2025-10-02", amount: 25 },
  { date: "2025-11-02", amount: 30 },
  { date: "2025-12-02", amount: 35 },
  { date: "2026-01-02", amount: 40 },
  { date: "2026-02-02", amount: 45 },
  { date: "2026-03-02", amount: 50 },
  { date: "2026-04-02", amount: 55 },
  { date: "2026-05-02", amount: 60 },
  { date: "2026-06-02", amount: 65 },
  { date: "2026-07-02", amount: 70 },
]

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipChart, TooltipChartItem } from "./tool-tip-chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const SubscribersChart = () => {
  return (
    <Card className="mt-8 p-4">
      <CardHeader>
        <CardTitle>Croissance Audience</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={SUBSCRIBERS}
            margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
            title="Croissance des ventes"
          >
            <CartesianGrid
              strokeDasharray="5 5"
              vertical={false}
              stroke="hsl(var(--muted-foreground) / 0.2)"
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="hsl(var(--primary) / 1)"
              fill="url(#color-primary)"
              dot={{
                stroke: "hsl(var(--primary) / 0.5)",
                strokeWidth: 1,
                r: 2,
              }}
              activeDot={{
                stroke: "hsl(var(--primary) / 1)",
                strokeWidth: 1,
                r: 4,
              }}
            />
            <Scatter dataKey="amount" fill="hsl(var(--primary))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground) / 0.5)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              interval={1} // Affiche une étiquette tous les 2 mois
            />
            <YAxis
              domain={[0, 100]}
              stroke="hsl(var(--muted-foreground) / 0.5)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => Intl.NumberFormat().format(value)}
              dataKey="amount"
            />
            <Tooltip
              cursor={{ stroke: "hsl(var(--primary) / 0.2)", strokeWidth: 2 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length > 0) {
                  return (
                    <TooltipChart>
                      <TooltipChartItem label="Utilisateurs">
                        {Intl.NumberFormat().format(
                          payload[0].payload.amount
                        )}
                      </TooltipChartItem>
                      <TooltipChartItem label="Date">
                        {new Date(payload[0].payload.date).toLocaleDateString()}
                      </TooltipChartItem>
                    </TooltipChart>
                  );
                }
                return null;
              }}
            />
            <defs>
              <linearGradient id="color-primary" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.4}
                />
                <stop
                  offset="75%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
