import { useState } from "react";

import { WeeklyCalendar } from "@/components/weekly-calendar";
import WelcomeMessage from "@/features/users/components/welcome-message";
import DailyProgress from "@/features/habits/components/daily-progress";

function getWeekMonday(date: Date): Date {
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 1) {
    return date;
  }

  const daysToSubtract = (dayOfWeek + 6) % 7;
  const monday = new Date(date);
  monday.setDate(date.getDate() - daysToSubtract);

  return monday;
}

export default function Home() {
  const [weekShift] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + weekShift * 7);

  const monday = getWeekMonday(date);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const today = new Date();

  return (
    <div>
      <WelcomeMessage />
      <DailyProgress monday={monday} sunday={sunday} today={today} />
      <WeeklyCalendar monday={monday} sunday={sunday} today={today} />
    </div>
  );
}
