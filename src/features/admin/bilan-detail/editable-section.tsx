"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, X, Check } from "lucide-react";
import { toast } from "sonner";

type EditableSectionProps<T> = {
  view: ReactNode;
  renderForm: (props: { values: T; setValues: (v: T) => void }) => ReactNode;
  initialValues: T;
  onSave: (values: T) => Promise<void>;
};

export function EditableSection<T>({ view, renderForm, initialValues, onSave }: EditableSectionProps<T>) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<T>(initialValues);
  const [saving, setSaving] = useState(false);

  if (!editing) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => { setValues(initialValues); setEditing(true); }}
          className="absolute right-0 top-0 rounded-md p-1.5 text-muted-foreground hover:bg-orange-500/10 hover:text-orange-500"
          aria-label="Modifier"
        >
          <Pencil className="size-4" />
        </button>
        {view}
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(values);
      toast.success("Enregistré");
      setEditing(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {renderForm({ values, setValues })}
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setEditing(false)} disabled={saving}>
          <X className="size-4" /> Annuler
        </Button>
        <Button size="sm" onClick={handleSave} disabled={saving} className="bg-orange-500 hover:bg-orange-400">
          <Check className="size-4" /> {saving ? "..." : "Enregistrer"}
        </Button>
      </div>
    </div>
  );
}