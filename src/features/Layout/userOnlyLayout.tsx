import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function UserOnlyLayout() {
  const { isAdmin } = useAuth();

  if (isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
