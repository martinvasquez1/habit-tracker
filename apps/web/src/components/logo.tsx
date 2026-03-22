import { useState } from "react";
import { Link } from "react-router";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";
import Ant from "../assets/ant1.min.svg";

export function Logo({ to = "/", size = "md", ...props }) {
  return (
    <Link to={to} className="flex gap-1 items-end w-full pr-8" {...props}>
      <img src={Ant} alt="Logo" className={size === "sm" ? "w-10" : "w-14"} />
      <span
        className={`${size === "sm" ? "mb-0" : "mb-1"} text-2xl font-semibold mt-2`}
      >
        Ant
      </span>
    </Link>
  );
}

export function SidebarLogo() {
  const { open: isOpen, isMobile, toggleSidebar } = useSidebar();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex justify-between items-center">
          <SidebarMenuButton
            tooltip="Open Sidebar"
            size="lg"
            className={`${(isOpen || isMobile) &&
              " hover:bg-transparent active:bg-transparent"
              }`}
            asChild
          >
            {isOpen ? (
              <Logo
                to="/home"
                size="sm"
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
              />
            ) : (
              isLogoHovered ?
                <SidebarTrigger className="p-4"
                  onMouseEnter={() => setIsLogoHovered(true)}
                  onMouseLeave={() => setIsLogoHovered(false)}
                /> :
                <Logo
                  to="/home"
                  size="sm"
                  onClick={() => toggleSidebar()}
                  onMouseEnter={() => setIsLogoHovered(true)}
                  onMouseLeave={() => setIsLogoHovered(false)}
                />
            )}
          </SidebarMenuButton>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
