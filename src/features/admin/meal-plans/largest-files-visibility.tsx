"use client";

import { useStorageVisibility } from "./storage-visibility-context";

export const LargestFilesVisibility = ({ children }: { children: React.ReactNode }) => {
  const { show } = useStorageVisibility();
  if (!show) return null;
  return <>{children}</>;
};