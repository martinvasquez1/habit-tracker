import { useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { Spinner } from "@/components/ui/spinner";
import Error from "@/components/error";

import YearlyCalendar from "@/features/logs/components/yearly-calendar";
import StatsCards from "@/features/logs/components/stats";
import { useHabit } from "@/features/habits/api/get-habit";
import { useLogs } from "@/features/logs/api/get-logs";
import { useStats } from "@/features/habits/api/get-stats";

import { formatYYYYMMDD } from "@/utils/format-yyyy-mm-dd";

import { ChartBar } from "@/components/ui/chart-bar";
import { ChartConfig } from "@/components/ui/chart";

export default function Habit() {
  const { t } = useTranslation();
  const months = t('common.months', { returnObjects: true }) as string[];

  const { habitId } = useParams<{ habitId: string }>();

  const [yearShift, setYearShift] = useState<number>(0);

  const { data: habit, isLoading, isError } = useHabit(habitId!);

  let currentYear = new Date().getFullYear();

  const year = currentYear + yearShift;

  const firstDayYear = new Date(year, 0, 1);
  const lastDayYear = new Date(year, 11, 31);
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

  const chartData = stats!.logsPerMonth.map((logs, index) => ({
    month: months[index],
    logs,
  }));

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: `var(--habit-${habit!.color})`
    },
  } satisfies ChartConfig

  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">{habit!.name}</h1>
      <StatsCards data={stats!} color={habit!.color} />
      <YearlyCalendar
        habit={habit!}
        logs={logs!}
        year={year}
        setYearShift={setYearShift}
        firstDay={firstDayYear}
        lastDay={lastDayYear}
      />
      <div className="flex flex-col md:flex-row gap-4 my-6 *:flex-1">
        <ChartBar
          title="Monthly logs"
          data={chartData}
          dataKey="logs"
          xKey="month"
          config={chartConfig}
        />
        <ChartBar
          title="Lorem"
          data={chartData}
          dataKey="logs"
          xKey="month"
          config={chartConfig}
        />
      </div>
    </div>
  );
};
