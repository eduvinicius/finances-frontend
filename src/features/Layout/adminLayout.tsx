import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SidebarProvider } from "@/shared/contexts/sidebar/sideBarContext";
import { Header } from "@/components/Header";
import { SidebarTrigger } from "@/components/ui/SideBar";
import { AppSidebar } from "@/components/AppSideBar";

export function AdminLayout() {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <SidebarTrigger className="mb-2 ml-2" />
        <section className="m-2">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}
