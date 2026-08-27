"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type StorageVisibilityContextType = {
  show: boolean;
  toggle: () => void;
};

const StorageVisibilityContext = createContext<StorageVisibilityContextType | null>(null);

export const StorageVisibilityProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);
  return (
    <StorageVisibilityContext.Provider value={{ show, toggle: () => setShow((s) => !s) }}>
      {children}
    </StorageVisibilityContext.Provider>
  );
};

export const useStorageVisibility = () => {
  const ctx = useContext(StorageVisibilityContext);
  if (!ctx) throw new Error("useStorageVisibility must be used within StorageVisibilityProvider");
  return ctx;
};