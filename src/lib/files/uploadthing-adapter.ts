import { UTApi } from "uploadthing/server";
import type { UploadFileAdapter } from "./upload-file";

const utapi = new UTApi();

export const fileAdapter: UploadFileAdapter = {
  uploadFile: async ({ file }) => {
    const response = await utapi.uploadFiles(file);

    if (response.error) {
      return { error: new Error(response.error.message), data: null };
    }

    return { error: null, data: { url: response.data.url } };
  },
  uploadFiles: async (params) => {
    const files = params.map((p) => p.file);
    const responses = await utapi.uploadFiles(files);

    return responses.map((r) => {
      if (r.error) {
        return { error: new Error(r.error.message), data: null };
      }
      return { error: null, data: { url: r.data.url } };
    });
  },
};