import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import InformationCards from "../_components/information-cards";
import { WeightProgressChart } from "../_components/weight-progress-chart";

export default async function RoutePage() {
  const user = await getRequiredUser();

  const profiles = await prisma.alimentaireProfile.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const latest = profiles[0] ?? null;
  const previous = profiles[1] ?? null;

  const chartData = [...profiles]
    .reverse()
    .map((p) => ({
      date: new Date(p.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
      poids: p.weight,
    }));

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
      </LayoutHeader>
      <LayoutActions></LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:gap-8">
        <InformationCards
          latestWeight={latest?.weight ?? null}
          previousWeight={previous?.weight ?? null}
          latestWaist={latest?.waist ?? null}
          previousWaist={previous?.waist ?? null}
          bilanCount={profiles.length}
          lastBilanDate={latest?.createdAt ?? null}
        />
        <WeightProgressChart data={chartData} />
      </LayoutContent>
    </Layout>
  );
}