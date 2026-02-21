import { useMemo, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import type { IAuthContextType } from "@/shared/types/authContext.type";
import { storage, STORAGE_KEYS } from "@/shared/utils/storage";
import type { IReactNode } from "@/shared/types/reactTypes";

export function AuthProvider({ children }: Readonly<IReactNode>) {

 const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return storage.has(STORAGE_KEYS.TOKEN);
  });

  const login = (token: string) => {
    const success = storage.set(STORAGE_KEYS.TOKEN, token);
    if (success) setIsAuthenticated(true);
  };

  const logout = () => {
    storage.remove(STORAGE_KEYS.TOKEN);
    setIsAuthenticated(false);
  };

  const getUserToken = (): string | null => {
    return storage.get<string>(STORAGE_KEYS.TOKEN);
  };

  const value = useMemo<IAuthContextType>(
    () => ({ isAuthenticated, login, logout, getUserToken }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}