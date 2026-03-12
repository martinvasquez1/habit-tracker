import { useParams } from "react-router";

import Spinner from "@/components/ui/spinner";
import Error from "@/components/error";

import YearlyCalendar from "@/features/logs/components/yearly-calendar";
import StatsCards from "@/features/logs/components/stats";

import { useHabit } from "@/features/habits/api/get-habit";
import { useLogs } from "@/features/logs/api/get-logs";
import { useStats } from "@/features/habits/api/get-stats";
import { formatYYYYMMDD } from "@/utils/format-yyyy-mm-dd";

export default function Habit() {
  const { habitId } = useParams<{ habitId: string }>();

  const { data: habit, isLoading, isError } = useHabit(habitId!);

  const firstDayYear = new Date(new Date().getFullYear(), 0, 1);
  const lastDayYear = new Date(new Date().getFullYear(), 11, 31);
  const firstDayYearStr = formatYYYYMMDD(firstDayYear);
  const lastDayYearStr = formatYYYYMMDD(lastDayYear);

  const {
    data: logs,
    isLoading: isLoadingLogs,
    isError: isErrorLogs,
  } = useLogs(Number(habitId!), firstDayYearStr, lastDayYearStr);

  const today = new Date();
  const todayStr = formatYYYYMMDD(today);

  const {
    data: stats,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useStats(+habitId!, todayStr);

  if (isLoading || isLoadingLogs || isLoadingStats) return <Spinner />;
  if (isError || isErrorLogs || isErrorStats) return <Error />;

  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">{habit!.name}</h1>
      <StatsCards data={stats!} />
      <YearlyCalendar habit={habit!} logs={logs!} />
    </div>
  );
}
