"use client";

import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

import {
  Bell,
  ChevronsUpDown,
  LogOut,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "./ui/skeleton";

import { User } from "@repo/open-api";
import { useUser } from "@/features/users/api/get-user";

interface UserSectionProps {
  user?: User;
}

function UserSection({ user }: UserSectionProps) {
  const firstLetter = user?.username.charAt(0).toUpperCase();

  const plan = "Starter Plan";
  const username = user?.username;
  const capitalizedUsername = username
    ? username.charAt(0).toUpperCase() + username.slice(1)
    : "";

  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={""} alt={user?.username} />
        <AvatarFallback className="rounded-lg">{firstLetter}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        {user ? (
          <>
            <span className="truncate font-semibold">
              {capitalizedUsername}
            </span>
            <span className="truncate text-xs text-green-600">{plan}</span>
          </>
        ) : (
          <>
            <Skeleton className="h-4 w-28" />
            <span className="truncate text-xs text-green-600">{plan}</span>
          </>
        )}
      </div>
    </>
  );
}

export function NavUser({}) {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");
  if (!jwt) return "Error";

  const decoded = jwtDecode(jwt) as { id: string };
  const userId = decoded.id;
  let { data: user, isError } = useUser(userId);

  if (isError) return "Error";

  function handleLogout() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserSection user={user} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserSection user={user} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <UserRound />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Sparkles />
                Upgrade to Premium
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
