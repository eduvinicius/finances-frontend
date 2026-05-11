import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../hooks/useAuth";
import type { IAuthContextType, UserRole } from "@/shared/types/authContext.type";
import { storage, STORAGE_KEYS } from "@/shared/utils/storage";
import type { IReactNode } from "@/shared/types/reactTypes";
import { getRoleFromToken } from "@/shared/utils/jwtDecode";

function deriveRole(token: string): UserRole | null {
  const raw = getRoleFromToken(token);
  if (raw === 'Admin' || raw === 'User') return raw;
  return null;
}

export function AuthProvider({ children }: Readonly<IReactNode>) {
  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return storage.has(STORAGE_KEYS.TOKEN);
  });

  const [role, setRole] = useState<UserRole | null>(() => {
    const token = storage.get<string>(STORAGE_KEYS.TOKEN);
    return token ? deriveRole(token) : null;
  });

  const login = useCallback((token: string) => {
    const tokenSuccess = storage.set(STORAGE_KEYS.TOKEN, token);
    if (tokenSuccess) {
      setIsAuthenticated(true);
      setRole(deriveRole(token));
    }
  }, []);

  const logout = useCallback(() => {
    storage.remove(STORAGE_KEYS.TOKEN);
    queryClient.clear();
    setIsAuthenticated(false);
    setRole(null);
  }, [queryClient]);

  const getUserToken = useCallback((): string | null => {
    return storage.get<string>(STORAGE_KEYS.TOKEN);
  }, []);

  const value = useMemo<IAuthContextType>(
    () => ({
      isAuthenticated,
      role,
      isAdmin: role === 'Admin',
      isUser: role === 'User',
      login,
      logout,
      getUserToken,
    }),
    [isAuthenticated, role, login, logout, getUserToken]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
