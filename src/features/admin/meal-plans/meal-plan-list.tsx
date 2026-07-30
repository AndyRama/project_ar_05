"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { isActionSuccessful } from "@/lib/actions/actions-utils";
import { deleteMealPlanAction } from "./delete-meal-plan.action";

type MealPlanDoc = {
  id: string;
  fileName: string;
  fileUrl: string;
  createdAt: Date;
};

type MealPlanListProps = {
  documents: MealPlanDoc[];
};

export const MealPlanList = ({ documents }: MealPlanListProps) => {
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleDelete = async (documentId: string, fileName: string) => {
    const confirmed = window.confirm(
      `Supprimer définitivement "${fileName}" ? Cette action est irréversible.`
    );
    if (!confirmed) return;

    setPendingId(documentId);
    try {
      const result = await deleteMealPlanAction({ documentId });
      if (!isActionSuccessful(result)) {
        toast.error(result.serverError ?? "Échec de la suppression");
        return;
      }
      toast.success("Fichier supprimé");
    } finally {
      setPendingId(null);
    }
  };

  if (documents.length === 0) {
    return <p className="text-sm text-muted-foreground">Aucun plan envoyé pour l'instant.</p>;
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between rounded-md border p-3">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-orange-500" />
            <div>
              <p className="text-sm font-medium">{doc.fileName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="size-4" />
                Ouvrir
              </Button>
            </a>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
              disabled={pendingId === doc.id}
              onClick={() => handleDelete(doc.id, doc.fileName)}
            >
              <Trash2 className="size-4" />
              {pendingId === doc.id ? "..." : "Supprimer"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};