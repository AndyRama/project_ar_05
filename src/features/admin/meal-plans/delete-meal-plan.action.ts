"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { ActionError } from "@/lib/errors/action-error";
import { utapi } from "@/lib/files/uploadthing-adapter";
import { getRequiredAdmin } from "@/lib/auth/auth-user";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const deleteMealPlanAction = authAction
  .inputSchema(
    z.object({
      documentId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { documentId } }) => {
    await getRequiredAdmin();

    const doc = await prisma.mealPlanDocument.findUnique({
      where: { id: documentId },
    });

    if (!doc) {
      throw new ActionError("Document introuvable");
    }

    // Supprime d'abord le fichier chez UploadThing (si on a la clé)
    if (doc.fileKey) {
      try {
        await utapi.deleteFiles(doc.fileKey);
      } catch (err) {
        logger.error("Échec de la suppression du fichier UploadThing", { err, documentId });
        throw new ActionError("Impossible de supprimer le fichier de stockage");
      }
    }

    // Puis supprime la ligne en base
    await prisma.mealPlanDocument.delete({
      where: { id: documentId },
    });

    revalidatePath(`/admin/alimentaire/pdf/${doc.userId}`);

    return { success: true };
  });