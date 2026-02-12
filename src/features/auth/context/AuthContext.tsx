import { useMemo, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import type { AuthContextType } from "@/shared/types/authContext.type";

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {

 const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const value = useMemo<AuthContextType>(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}