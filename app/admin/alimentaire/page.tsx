import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getRequiredAdmin } from "@/lib/auth/auth-user";
import Link from "next/link";
import { FileText, Eye } from "lucide-react";

export default async function AdminMealPlansPage() {
  await getRequiredAdmin();

  const users = await prisma.user.findMany({
    where: { alimentaireProfiles: { some: {} } },
    include: {
      mealPlanDocuments: { orderBy: { createdAt: "desc" } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Plans alimentaires | Gestion des PDF</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Plans envoyés</TableHead>
                <TableHead className="text-center">Actions</TableHead>
                <TableHead className="text-center">Bilan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name ?? "N/A"}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell className="text-center font-semibold text-orange-600">
                    {u.mealPlanDocuments.length}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link href={`/admin/alimentaire/pdf/${u.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="size-4" />
                        Gérer
                      </Button>
                    </Link>
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
                    <Link href={`/admin/demo-fiche`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Eye className="size-4" />
                        Bilan
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </LayoutContent>
    </Layout>
  );
}