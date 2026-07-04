import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { getRequiredAdmin } from "@/lib/auth/auth-user";

export default async function AdminPage() {
  await getRequiredAdmin();

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Tableau de bord</LayoutTitle>
        <LayoutDescription>Gestion des utilisateurs</LayoutDescription>
      </LayoutHeader>

      <LayoutContent></LayoutContent>
    </Layout>
  );
}
