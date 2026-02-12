import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/SideBar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/shared/constants/routes.cons";
import { useLocation } from "react-router-dom";

export function AppSidebar() {

  const location = useLocation();
  const { getUserData } = useAuth();
  
  const userData = getUserData();
  const sideBarItems = ROUTES;

  return (
    <Sidebar>
    <SidebarContent>
        <SidebarGroup />
        <nav>
          <SidebarMenu>
            {sideBarItems.map((item) => {
              const IconComponent = item.icon;
              return (
              <SidebarMenuItem 
                className={`hover:bg-(--green-200) rounded-md ${location.pathname === item.url ? "bg-(--green-200)" : ""}`}
                key={item.id}>
                <SidebarMenuButton size="lg" asChild>
                  <a 
                    className="h-9 cursor-pointer" 
                    href={item.url}>
                    {IconComponent && <IconComponent size="2.25rem" />}
                    <span className="text-base">{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
            })}
          </SidebarMenu>
        </nav>
        <SidebarGroup />
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            {userData?.fullName}
            {userData?.nickName}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    </Sidebar>
  )
}