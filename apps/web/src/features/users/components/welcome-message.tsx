import { jwtDecode } from "jwt-decode";
import { useUser } from "../api/get-user";

import { Skeleton } from "@/components/ui/skeleton";

export default function WelcomeMessage() {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) return "Error";

  const decoded = jwtDecode(jwt) as { id: string };
  const userId = decoded.id;
  const { data: user, isLoading } = useUser(userId);

  const hour = new Date().getHours();
  let greeting = "";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  if (isLoading) return <Skeleton className="h-8 w-64 mb-6" />;

  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">
        {greeting}, {user?.username}
      </h1>
    </div>
  );
}
