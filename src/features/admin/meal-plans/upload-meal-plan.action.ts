"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { ActionError } from "@/lib/errors/action-error";
import { uploadFileDetailed } from "@/lib/files/uploadthing-adapter";
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

    const response = await uploadFileDetailed(file);
    if (response.error) {
      throw new ActionError(response.error.message);
    }

    await prisma.mealPlanDocument.create({
      data: {
        userId,
        fileName: file.name,
        fileUrl: response.data.url,
        fileKey: response.data.key,
      },
    });

    revalidatePath(`/admin/alimentaire/pdf/${userId}`);

    return response.data.url;
  });