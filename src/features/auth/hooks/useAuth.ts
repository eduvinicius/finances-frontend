import { createContext, useContext } from "react";
import type { AuthContextType } from "@/shared/types/authContext.type";

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}