"use client";

import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { deleteBilanAction } from "./delete-bilan-action";

export const BilanRowActions = ({ profileId }: { profileId: string }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Supprimer définitivement ce bilan ? Cette action est irréversible."
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await deleteBilanAction(profileId);
      toast.success("Bilan supprimé");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de la suppression");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Link href={`/app/bilan/${profileId}/modifier`}>
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="size-4" />
          Modifier
        </Button>
      </Link>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
        disabled={deleting}
        onClick={handleDelete}
      >
        <Trash2 className="size-4" />
        {deleting ? "..." : "Supprimer"}
      </Button>
    </div>
  );
};