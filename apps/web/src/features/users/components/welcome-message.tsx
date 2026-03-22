import { jwtDecode } from "jwt-decode";
import { useUser } from "../api/get-user";

import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export default function WelcomeMessage() {
  const { t } = useTranslation();

  const jwt = localStorage.getItem("jwt");
  if (!jwt) return "Error";

  const decoded = jwtDecode(jwt) as { id: string };
  const userId = decoded.id;
  const { data: user, isLoading } = useUser(userId);

  function getGreetingKey(hour: number) {
    if (hour < 12) return 'home.greeting.morning';
    if (hour < 18) return 'home.greeting.afternoon';
    return 'home.greeting.evening';
  };

  const hour = new Date().getHours();
  const greeting = t(getGreetingKey(hour));

  if (isLoading) return <Skeleton className="h-8 w-64 mb-6" />;

  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">
        {greeting}, {user?.username}
      </h1>
    </div>
  );
}
