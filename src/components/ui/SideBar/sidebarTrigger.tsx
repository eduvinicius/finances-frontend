import type { ComponentProps } from "react"

import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go"

import { cn } from "@/lib/utils"
import { useSidebar } from "@/hooks/useSideBar"

import { Button } from "../Button"

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: ComponentProps<typeof Button>) {
  const { toggleSidebar, state } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      {state === "collapsed" ? <GoSidebarExpand /> : <GoSidebarCollapse />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}