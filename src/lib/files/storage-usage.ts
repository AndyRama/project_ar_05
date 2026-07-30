"use server";

import { utapi } from "./uploadthing-adapter";

const STORAGE_LIMIT_BYTES = 2 * 1024 * 1024 * 1024; // 2 Go

export async function getStorageUsage() {
  let offset = 0;
  let hasMore = true;
  let totalBytes = 0;

  const files: { key: string; name: string; size: number; uploadedAt: number }[] = [];

  while (hasMore) {
    const res = await utapi.listFiles({ offset, limit: 500 });
    for (const f of res.files) {
      totalBytes += f.size;
      files.push({ key: f.key, name: f.name, size: f.size, uploadedAt: f.uploadedAt });
    }
    hasMore = res.hasMore;
    offset += 500;
  }

  files.sort((a, b) => b.size - a.size);

  return {
    usedBytes: totalBytes,
    limitBytes: STORAGE_LIMIT_BYTES,
    remainingBytes: STORAGE_LIMIT_BYTES - totalBytes,
    percentUsed: Math.min(100, (totalBytes / STORAGE_LIMIT_BYTES) * 100),
    largestFiles: files.slice(0, 15), // top 15 pour identifier quoi nettoyer
  };
}

export async function deleteUploadedFileAction(key: string) {
  await utapi.deleteFiles(key);
}