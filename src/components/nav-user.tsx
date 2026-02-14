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
import type { LoginResponse } from "@/shared/types/login.type"
import { MENU_ITEMS } from "@/shared/constants/menuItems.const"

export function NavUser({
  user,
}: Readonly<{
  user: LoginResponse | null
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
                <AvatarImage src={user?.avatar} alt={user?.fullName} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.fullName}</span>
                <span className="truncate text-xs">{user?.nickName}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel 
              className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.fullName} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.fullName}</span>
                  <span className="truncate text-xs">{user?.nickName}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {MENU_ITEMS.map((item) => (
              <DropdownMenuGroup key={item.id}>
                <DropdownMenuItem
                  onSelect={item.onClick && item.label === "Sair" ? handleLogout : item.onClick}
                  className="cursor-pointer"
                >
                  {item.url ? (
                    <a href={item.url} className="flex items-center gap-2">
                      {item.icon && <item.icon className="size-4 mr-2" />}
                      {item.label}
                    </a>
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
