import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/SideBar"
import type { IRoute } from "@/shared/types/routes.types"
import { useLocation, Link } from "react-router-dom"

export function NavMain({
  items,
}: Readonly<{
  items: IRoute[]
}>) {

  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem 
            className="cursor-pointer hover:bg-(--green-300)"
            key={item.id}>
            <Link 
              to={item.url}>
              <SidebarMenuButton 
                className={`cursor-pointer ${location.pathname === item.url ? "bg-(--green-300)" : ""}`}
                tooltip={item.label}>
                  {item.icon && <span className="text-lg"><item.icon /></span>}
                  <span className="text-lg"> {item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
