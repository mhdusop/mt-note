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

export function AppSidebar() {
   const [user, setUser] = React.useState<null | {
      name: string
      email: string
      role: string
   }>(null)

   React.useEffect(() => {
      const stored = sessionStorage.getItem("user")

      if (stored) {
         try {
            const parsed = JSON.parse(stored)
            setUser(parsed)
         } catch (err) {
            console.error(err);
            sessionStorage.removeItem("user")
            setUser(null)
         }
      }
   }, [])

   if (!user) return null

   const navMain = [
      {
         title: "Dashboards",
         url: "/dashboard",
         icon: LayoutDashboard,
         visible: true
      },
      {
         title: "Users",
         url: "/dashboard/user",
         icon: UsersRound,
         visible: user.role === "ADMIN",
      },
      {
         title: "Assets",
         url: "/dashboard/asset",
         icon: Box,
         visible: user.role === "ADMIN",
      },
      {
         title: "Records",
         url: "/dashboard/record",
         icon: NotepadText,
         visible:
            user.role === "ADMIN" ||
            user.role === "MEMBER",
      },
      {
         title: "Schedules",
         url: "/dashboard/schedule",
         icon: CalendarDays,
         visible: user.role === "ADMIN" || user.role === "MANAGER",
      },
   ]

   return (
      <Sidebar>
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                     <a href="#">
                        <ArrowUpCircleIcon className="h-5 w-5" />
                        <span className="text-base font-semibold">PLANS</span>
                     </a>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={navMain.filter(item => item.visible)} />
         </SidebarContent>
         <SidebarFooter>
            <NavUser user={user} />
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   )
}
