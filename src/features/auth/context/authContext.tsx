import { useMemo, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import type { AuthContextType } from "@/shared/types/authContext.type";
import type { LoginResponse } from "@/shared/types/login.type";

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {

 const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const userData = localStorage.getItem("userData");
    return !!userData;
  });

  const login = (userData: LoginResponse) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
  };

  const getUserData = (): LoginResponse | null => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  };

  const value = useMemo<AuthContextType>(
    () => ({ isAuthenticated, login, logout, getUserData }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}