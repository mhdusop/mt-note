"use client"

import * as React from "react"
import {
   ArrowUpCircleIcon,
   Box,
   NotepadText,
   UsersRound,
   CalendarDays,
   LayoutDashboard,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
} from "@/components/ui/sidebar"

const data = {
   user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
   },
   navMain: [
      {
         title: "Dashboard",
         url: "/dashboard",
         icon: LayoutDashboard,
      },
      {
         title: "User",
         url: "/dashboard/user",
         icon: UsersRound,
      },
      {
         title: "Assets",
         url: "/dashboard/asset",
         icon: Box,
      },
      {
         title: "Records",
         url: "/dashboard/record",
         icon: NotepadText,
      },
      {
         title: "Schedules",
         url: "/dashboard/schedule",
         icon: CalendarDays,
         isActive: true,
      },
   ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar collapsible="icon" {...props}>
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton
                     asChild
                     className="data-[slot=sidebar-menu-button]:!p-1.5"
                  >
                     <a href="#">
                        <ArrowUpCircleIcon className="h-5 w-5" />
                        <span className="text-base font-semibold">PLANS</span>
                     </a>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={data.navMain} />
         </SidebarContent>
         <SidebarFooter>
            <NavUser user={data.user} />
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   )
}
