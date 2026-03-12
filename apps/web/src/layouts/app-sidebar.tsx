"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { SidebarLogo } from "@/components/logo";
import { Home, Settings, Apple, Users, ChartColumn } from "lucide-react";

const itemsMain = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Habits",
    url: "/habits",
    icon: Apple,
  },
  {
    title: "Groups",
    url: "#",
    icon: Users,
    isDisabled: true,
  },
  {
    title: "Insights",
    url: "#",
    icon: ChartColumn,
    isDisabled: true,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    isDisabled: true,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={itemsMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
