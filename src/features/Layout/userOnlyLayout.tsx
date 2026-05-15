import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ADMIN_ROUTES } from "@/shared/constants/routes.cons";

export function UserOnlyLayout() {
  const { isAdmin } = useAuth();

  if (isAdmin) {
    return <Navigate to={ADMIN_ROUTES.ADMIN_HOME} replace />;
  }

  return <Outlet />;
}
