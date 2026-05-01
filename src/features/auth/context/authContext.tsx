import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../hooks/useAuth";
import type { IAuthContextType } from "@/shared/types/authContext.type";
import { storage, STORAGE_KEYS } from "@/shared/utils/storage";
import type { IReactNode } from "@/shared/types/reactTypes";

export function AuthProvider({ children }: Readonly<IReactNode>) {
  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return storage.has(STORAGE_KEYS.TOKEN);
  });

  const login = useCallback((token: string) => {
    const success = storage.set(STORAGE_KEYS.TOKEN, token);
    if (success) setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    storage.remove(STORAGE_KEYS.TOKEN);
    queryClient.clear();
    setIsAuthenticated(false);
  }, [queryClient]);

  const getUserToken = useCallback((): string | null => {
    return storage.get<string>(STORAGE_KEYS.TOKEN);
  }, []);

  const value = useMemo<IAuthContextType>(
    () => ({ isAuthenticated, login, logout, getUserToken }),
    [isAuthenticated, login, logout, getUserToken]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}