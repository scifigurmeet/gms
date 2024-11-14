import { CircleGauge, ClipboardPlus, Settings, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: CircleGauge,
  },
  {
    title: "Users",
    url: "#",
    icon: Users,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Report",
    url: "#",
    icon: ClipboardPlus,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="mt-16">
      <SidebarContent className="mt-2 bg-background">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="rounded-lg hover:bg-accent"
                >
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-4 text-base"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
