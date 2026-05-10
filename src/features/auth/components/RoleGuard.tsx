import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "@/shared/types/authContext.type";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback = null }: RoleGuardProps) {
  const { role } = useAuth();

  if (role !== null && allowedRoles.includes(role)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
