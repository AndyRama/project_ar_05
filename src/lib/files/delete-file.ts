"use server";

import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import { logger } from "@/lib/logger";

const utapi = new UTApi();

export const deleteStorageFile = async (key: string) => {
  try {
    await utapi.deleteFiles(key);
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    logger.error("Échec de la suppression du fichier UploadThing", { err, key });
    return { success: false, error: "Suppression impossible" };
  }
};