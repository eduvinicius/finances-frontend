import {
  ChevronsUpDown,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/SideBar"
import { useSidebar } from "@/hooks/useSideBar"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { MENU_ITEMS } from "@/shared/constants/menuItems.const"
import type { IUserApiResponse } from "@/shared/types/user.types"
import { Link } from "react-router-dom"

export function NavUser({
  user,
}: Readonly<{
  user: IUserApiResponse | undefined
}>) {

  const { isMobile } = useSidebar()
  const { logout } = useAuth();

  const handleLogout = () => {
      logout();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer hover:bg-(--green-200)"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.profileImageUrl} alt={user?.fullName} />
                <AvatarFallback className="rounded-full bg-(--green-200)">{user?.fullName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.fullName}</span>
                <span className="truncate text-xs">{user?.nickname}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-(--green-200)"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel 
              className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.profileImageUrl} alt={user?.fullName} />
                  <AvatarFallback className="rounded-full bg-(--green-200)">{user?.fullName?.[0]}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.fullName}</span>
                  <span className="truncate text-xs">{user?.nickname}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {MENU_ITEMS.map((item) => (
              <DropdownMenuGroup key={item.id}>
                <DropdownMenuItem
                  onSelect={item.onClick && item.label === "Sair" ? handleLogout : item.onClick}
                  className="cursor-pointer hover:bg-(--green-300)"
                >
                  {item.url ? (
                    <Link to={item.url} className="flex items-center gap-2"> 
                       <span>{item.icon && <item.icon />}</span>
                       <span> {item.label}</span>
                    </Link>
                  ) : (
                    <>
                      {item.icon && <item.icon className="size-4 mr-2" />}
                      {item.label}
                    </>
                  )}
                </DropdownMenuItem>
                {item.divider && <DropdownMenuSeparator />}
              </DropdownMenuGroup>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
