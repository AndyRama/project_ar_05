"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStorageVisibility } from "./storage-visibility-context";

export const ToggleLargestFilesButton = () => {
  const { show, toggle } = useStorageVisibility();

  return (
    <Button variant="ghost" size="sm" onClick={toggle} className="gap-1 text-xs text-muted-foreground">
      {show ? "Voir moins" : "Voir plus"}
      {show ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
    </Button>
  );
};