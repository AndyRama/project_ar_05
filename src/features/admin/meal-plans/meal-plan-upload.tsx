"use client";

import { Loader } from "@/components/nowts/loader";
import { isActionSuccessful } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { NativeTargetBox } from "@/features/.../native-target-box"; // adapte le chemin réel
import { uploadMealPlanAction } from "./upload-meal-plan.action";

type MealPlanUploadProps = {
  userId: string;
  onUploaded?: () => void;
};

export const MealPlanUpload = ({ userId, onUploaded }: MealPlanUploadProps) => {
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.set("files", file);
      formData.set("userId", userId);

      const result = await uploadMealPlanAction({ formData, userId });

      if (!isActionSuccessful(result)) {
        toast.error(result.serverError ?? "Une erreur est survenue");
        return;
      }

      toast.success("Plan alimentaire envoyé");
      onUploaded?.();
    },
  });

  const handleDrop = async (item: { files: File[] }) => {
    const file = item.files[0];

    if (file.type !== "application/pdf") {
      toast.error("Fichier invalide", { description: "Seuls les PDF sont acceptés" });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Fichier trop volumineux (max 10mb)");
      return;
    }

    uploadMutation.mutate(file);
  };

  return (
    <NativeTargetBox
      className="flex h-32 items-center justify-center rounded-md border border-dashed"
      isLoading={uploadMutation.isPending}
      onDrop={handleDrop}
      accept={["application/pdf"]}
    >
      {uploadMutation.isPending ? <Loader /> : <span className="text-sm text-muted-foreground">Dépose un PDF ou clique pour choisir</span>}
    </NativeTargetBox>
  );
};