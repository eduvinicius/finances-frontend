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
import { useAuth } from "@/features/auth/hooks/useAuth"
import type { LoginResponse } from "@/shared/types/login.type"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { getUserData } = useAuth()
  const userData: LoginResponse | null = getUserData()

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
