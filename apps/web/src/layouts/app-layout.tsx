import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainWrapper from "@/components/main-wrapper";

function getCookie(key: string) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export default function AppLayout() {
  const cookie = getCookie("sidebar:state");
  const defaultOpen = cookie === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <MainWrapper />
    </SidebarProvider>
  );
}
