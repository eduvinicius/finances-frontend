import type { ComponentProps } from "react"
import { NavMain } from "@/components/AppSideBar/nav-main"
import { NavUser } from "@/components/AppSideBar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/SideBar"
import { ROUTES } from "@/shared/constants/routes.cons"
import { useUser } from "@/hooks/useUser"
import { useAuth } from "@/features/auth/hooks/useAuth"

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {

  const { data: userData } = useUser();
  const { role } = useAuth();

  const visibleRoutes = ROUTES.filter(
    (route) => !route.roles || route.roles.includes(role!)
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={visibleRoutes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
