import { createContext, useContext } from "react";
import type { IPrivacyContextType } from "@/shared/types/privacyContext.type";

export const PrivacyContext = createContext<IPrivacyContextType | null>(null);

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (!context) throw new Error("usePrivacy must be used within PrivacyProvider");
  return context;
}
