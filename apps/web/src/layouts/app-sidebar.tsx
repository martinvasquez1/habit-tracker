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
import { useTranslation } from "react-i18next";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();

  const itemsMain = [
    {
      title: t('sidebar.home'),
      url: "/home",
      icon: Home,
    },
    {
      title: t('sidebar.habits'),
      url: "/habits",
      icon: Apple,
    },
    {
      title: t('sidebar.groups'),
      url: "#",
      icon: Users,
      isDisabled: true,
    },
    {
      title: t('sidebar.insights'),
      url: "#",
      icon: ChartColumn,
      isDisabled: true,
    },
    {
      title: t('sidebar.settings'),
      url: "/settings",
      icon: Settings
    },
  ];

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
