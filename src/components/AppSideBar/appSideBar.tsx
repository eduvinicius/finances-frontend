import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/SideBar";

export function AppSidebar() {
  return (
    <Sidebar>
    <SidebarContent>
        <SidebarGroup />
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupAction>
                <span className="sr-only">Add Project</span>
            </SidebarGroupAction>
            <SidebarGroupContent></SidebarGroupContent>
        <SidebarGroup />
    </SidebarContent>
    </Sidebar>
  )
}