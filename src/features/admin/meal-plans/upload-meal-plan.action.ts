"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { ActionError } from "@/lib/errors/action-error";
import { fileAdapter } from "@/lib/files/uploadthing-adapter";
import { getRequiredAdmin } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const uploadMealPlanAction = authAction
  .inputSchema(
    z.object({
      formData: z.instanceof(FormData),
      userId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { formData, userId } }) => {
    // Vérifie que celui qui upload est bien admin (pas juste connecté)
    await getRequiredAdmin();

    const files = formData.get("files") as File | File[];
    const file = Array.isArray(files) ? files[0] : files;

    if (!(file instanceof File)) {
      throw new ActionError("Fichier invalide");
    }

    if (file.type !== "application/pdf") {
      throw new ActionError("Seuls les fichiers PDF sont acceptés");
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new ActionError("Fichier trop volumineux (max 10mb)");
    }

    const response = await fileAdapter.uploadFile({
      file,
      path: "meal-plans",
    });

    if (response.error) {
      throw new ActionError(response.error.message);
    }

    await prisma.mealPlanDocument.create({
      data: {
        userId,
        fileName: file.name,
        fileUrl: response.data.url,
      },
    });

    revalidatePath(`/admin/alimentaire/${userId}`);

    return response.data.url;
  });