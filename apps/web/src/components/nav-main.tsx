"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  sidebarMenuButtonVariants,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

import { Link } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    isDisabled?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-1">
        {items.map((item, index) => (
          <SidebarMenuItem key={index}>
            {item.isDisabled ? (
              <button
                className={cn(sidebarMenuButtonVariants({}), "pl-3")}
                disabled
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </button>
            ) : (
              <SidebarMenuButton tooltip={item.title} className="pl-3" asChild>
                <Link
                  to={item.url}
                  onClick={() => isMobile && setOpenMobile(false)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
