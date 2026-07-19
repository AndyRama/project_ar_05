import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { getRequiredAdmin } from "@/lib/auth/auth-user";
import { ReceiptEuro, TrendingUp, FilePen, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscribersChart } from "./_components/sub-scribers-chart";

// ── Data ──────────────────────────────────────────────────────────

const STATS_TOP = [
  {
    label: "Total Ventes en ligne",
    value: "+ 16",
    trend: "+ 12.5% depuis le mois dernier",
    icon: ReceiptEuro,
  },
  {
    label: "New subscribers",
    value: "+ 26",
    trend: "+ 15.2% depuis le mois dernier",
    icon: Users,
  },
  {
    label: "Nombre d'articles",
    value: "+ 9",
    trend: "+ 25% pour le prochain mois",
    icon: FilePen,
  },
];

const STATS_SUBS = [
  {
    label: "Abonnement 3 mois",
    value: "+ 8",
    trend: "+ 12.5% depuis le mois dernier",
    icon: ReceiptEuro,
  },
  {
    label: "Abonnement 6 mois",
    value: "+ 10",
    trend: "+ 15.2% depuis le mois dernier",
    icon: ReceiptEuro,
  },
  {
    label: "Abonnement 12 mois",
    value: "+ 8",
    trend: "+ 5% pour le prochain mois",
    icon: TrendingUp,
  },
];

// ── StatCard ──────────────────────────────────────────────────────

type StatCardProps = {
  label: string;
  value: string;
  trend: string;
  icon: React.ElementType;
};

const StatCard = ({ label, value, trend, icon: Icon }: StatCardProps) => (
  <Card className="w-full flex-1">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
      <CardTitle className="text-sm font-medium">{label}</CardTitle>
      <Icon className="size-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{trend}</p>
    </CardContent>
  </Card>
);

// ── Page ──────────────────────────────────────────────────────────

export default async function AdminPage() {
  await getRequiredAdmin();

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Tableau de bord</LayoutTitle>
        <LayoutDescription>Gestion des utilisateurs</LayoutDescription>
      </LayoutHeader>

      <LayoutContent>
        {/* Abonnements */}
        <div className="flex w-full items-center gap-4 max-lg:flex-col lg:gap-6">
          {STATS_SUBS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Ventes / Subscribers / Articles */}
        <div className="mt-4 flex w-full items-center gap-4 max-lg:flex-col lg:gap-6">
          {STATS_TOP.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Chart */}
        <SubscribersChart />
      </LayoutContent>
    </Layout>
  );
}