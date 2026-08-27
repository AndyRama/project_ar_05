"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteStorageFile } from "@/lib/files/delete-file";

const formatMb = (bytes: number) => (bytes / (1024 * 1024)).toFixed(1);

type FileItem = { key: string; name: string; size: number };

export const LargestFilesList = ({ files }: { files: FileItem[] }) => {
  const [items, setItems] = useState(files);
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (key: string) => {
    setPendingKey(key);
    startTransition(async () => {
      const result = await deleteStorageFile(key);
      if (result.success) {
        setItems((prev) => prev.filter((f) => f.key !== key));
      }
      setPendingKey(null);
    });
  };

  if (items.length === 0) {
    return <p className="text-xs text-muted-foreground">Aucun fichier restant.</p>;
  }

  return (
    <div className="space-y-1">
      {items.map((f) => (
        <div key={f.key} className="flex items-center justify-between text-xs group">
          <span className="truncate">{f.name}</span>
          <div className="ml-2 flex shrink-0 items-center gap-2">
            <span className="text-muted-foreground">{formatMb(f.size)} Mo</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-red-500"
              disabled={isPending && pendingKey === f.key}
              onClick={() => handleDelete(f.key)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};