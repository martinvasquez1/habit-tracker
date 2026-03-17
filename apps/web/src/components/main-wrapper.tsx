import { Outlet } from "react-router";

import { Separator } from "./ui/separator";
import { SidebarTrigger, SidebarInset } from "./ui/sidebar";
import { Logo } from "./logo";

export default function MainWrapper({}) {
  return (
    <SidebarInset className="max-w-4xl mx-auto">
      {/* SidebarInset is necessary if sidebar is 'inset' variant. */}
      {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"> */}
      <header className="bg-sidebar text-sidebar-foreground transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:hidden">
        <div className="max-w-(--breakpoint-xl) flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="flex items-center space-x-3 rtl:space-x-reverse">
            <Logo to="/home" />
          </span>
          <SidebarTrigger />
        </div>
        <Separator
          data-sidebar="separator"
          className="w-auto bg-sidebar-border"
        />
      </header>
      <main className="py-6 px-4 bg-background">
        <Outlet />
      </main>
    </SidebarInset>
  );
}
