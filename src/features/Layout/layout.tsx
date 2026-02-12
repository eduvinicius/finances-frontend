import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { SidebarProvider } from "@/shared/contexts/sidebar/sideBarContext";
import { SidebarTrigger } from "@/components/ui/SideBar";
import { AppSidebar } from "@/components/AppSideBar";

export function Layout() {
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