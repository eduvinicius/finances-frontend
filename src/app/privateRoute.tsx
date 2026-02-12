import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function PrivateRoute({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
