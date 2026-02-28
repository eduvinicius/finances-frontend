import { createContext, useContext } from "react";
import type { IAuthContextType } from "@/shared/types/authContext.type";

export const AuthContext = createContext<IAuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}