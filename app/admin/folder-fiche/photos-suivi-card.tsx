"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageFormItem } from "@/features/.../image-form-item"; // adapte le chemin réel
import { useState } from "react";

type PhotoSlot = "face" | "profil" | "dos";

const LABELS: Record<PhotoSlot, string> = {
  face: "Face",
  profil: "Profil",
  dos: "Dos",
};

export const PhotosSuiviCard = () => {
  const [photos, setPhotos] = useState<Record<PhotoSlot, string | null>>({
    face: null,
    profil: null,
    dos: null,
  });

  return (
    <Card className="border-orange-500/30">
      <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
        <CardTitle className="px-2 text-orange-500">Photos de suivi</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-4 text-xs text-muted-foreground">
          Démo — upload réel, non rattaché à un client pour l'instant.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {(Object.keys(LABELS) as PhotoSlot[]).map((slot) => (
            <div key={slot} className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium text-muted-foreground">{LABELS[slot]}</p>
              <ImageFormItem
                imageUrl={photos[slot]}
                onChange={(url) => setPhotos((prev) => ({ ...prev, [slot]: url }))}
                className="aspect-[3/4] h-auto w-full"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};