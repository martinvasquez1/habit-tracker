import { WeeklyCalendar } from "@/components/weekly-calendar";
import WelcomeMessage from "@/features/users/components/welcome-message";

export default function Home() {
  return (
    <div>
      <WelcomeMessage />
      <WeeklyCalendar />
    </div>
  );
}
