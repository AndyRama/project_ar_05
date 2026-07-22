import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FAKE_MONTHLY_HISTORY } from "./fake-data";

export const MonthlyHistoryTable = () => (
  <Card className="border-orange-500/30">
    <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
      <CardTitle className="px-2 text-orange-500">Suivi mensuel</CardTitle>
    </CardHeader>
    <CardContent className="pt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mois</TableHead>
            <TableHead>Poids (kg)</TableHead>
            <TableHead>Masse grasse (%)</TableHead>
            <TableHead>Sommeil (h)</TableHead>
            <TableHead>Nutrition (1-5)</TableHead>
            <TableHead>Entraînement (1-5)</TableHead>
            <TableHead>Énergie (1-5)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FAKE_MONTHLY_HISTORY.map((row) => (
            <TableRow key={row.month}>
              <TableCell className="font-medium">{row.month}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell>{row.bodyFat}</TableCell>
              <TableCell>{row.sleep}</TableCell>
              <TableCell>{row.nutrition}</TableCell>
              <TableCell>{row.training}</TableCell>
              <TableCell>{row.energy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);