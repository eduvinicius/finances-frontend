"use client"

import * as React from "react"

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const { data: userData } = useUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={ROUTES} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
