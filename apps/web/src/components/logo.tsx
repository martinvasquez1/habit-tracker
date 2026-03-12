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
        className={`${size === "sm" ? "mb-0" : "mb-1"} text-2xl font-semibold `}
      >
        Ant
      </span>
    </Link>
  );
}

export function SidebarLogo() {
  const { open: isOpen, isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex justify-between items-center">
          <SidebarMenuButton
            tooltip="Open Sidebar"
            className={`${
              (isOpen || isMobile) &&
              " hover:bg-transparent active:bg-transparent"
            }`}
            asChild
          >
            {isOpen || isMobile ? (
              <div className="h-full flex justify-between gap-2">
                <Logo
                  to="/home"
                  size="sm"
                  onClick={() => setOpenMobile(false)}
                />
                <SidebarTrigger className="p-4" />
              </div>
            ) : (
              <SidebarTrigger />
            )}
          </SidebarMenuButton>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
