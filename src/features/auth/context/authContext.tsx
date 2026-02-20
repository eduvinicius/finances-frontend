import { useMemo, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import type { AuthContextType } from "@/shared/types/authContext.type";
import type { LoginResponse } from "@/shared/types/login.type";
import { storage, STORAGE_KEYS } from "@/shared/utils/storage";

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {

 const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return storage.has(STORAGE_KEYS.USER_DATA);
  });

  const login = (userData: LoginResponse) => {
    const success = storage.set(STORAGE_KEYS.USER_DATA, userData);
    if (success) {
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    storage.remove(STORAGE_KEYS.USER_DATA);
    setIsAuthenticated(false);
  };

  const getUserData = (): LoginResponse | null => {
    return storage.get<LoginResponse>(STORAGE_KEYS.USER_DATA);
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