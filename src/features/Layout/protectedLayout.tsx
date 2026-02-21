import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Header } from "@/components/Header";
import { SidebarProvider } from "@/shared/contexts/sidebar/sideBarContext";
import { SidebarTrigger } from "@/components/ui/SideBar";
import { AppSidebar } from "@/components/AppSideBar";

export function ProtectedLayout() {
  
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <SidebarTrigger className="mb-2 ml-2"/>
        <section className="m-2">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}
