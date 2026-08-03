"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageFormItem } from "@/features/images/image-form-item";
import { useState } from "react";

type PhotoType = "face" | "profil" | "dos";

const LABELS: Record<PhotoType, string> = {
  face: "Face",
  profil: "Profil",
  dos: "Dos",
};

type PhotoCardProps = {
  type: PhotoType;
};

export const PhotoCard = ({ type }: PhotoCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <Card className="flex h-full flex-col border-orange-500/30">
      <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-transparent">
        <CardTitle className="px-2 text-orange-500">{LABELS[type]}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-6">
        <ImageFormItem
          imageUrl={imageUrl}
          onChange={setImageUrl}
          className="aspect-square h-auto w-full flex-1"
        />
      </CardContent>
    </Card>
  );
};