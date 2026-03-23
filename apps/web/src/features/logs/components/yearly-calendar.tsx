import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Habit, Log } from "@repo/open-api";

import IconWrapper from "@/components/icon-wrapper";
import { Button } from "@/components/ui/button";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import CalendarDay from "@/features/logs/components/calendar-day";
import { fillMissingLogs } from "@/utils/fill-missing-logs";

interface YearlyCalendarProps {
  habit: Habit;
  logs: Log[];
}

export default function YearlyCalendar({ habit, logs }: YearlyCalendarProps) {
  const { t } = useTranslation();
  const months = t('common.months', { returnObjects: true }) as string[];

  const { color, id: habitId } = habit;
  
  const [yearShift, setYearShift] = useState(0);
  let currentYear = new Date().getFullYear();
  currentYear += yearShift;

  const firstDay = new Date(currentYear, 0, 1);
  const lastDay = new Date(currentYear, 11, 31);
  const filledLogs = fillMissingLogs(logs, habitId, firstDay, lastDay);

  // -1 so week starts at Monday
  let firstDayIndex = firstDay.getDay() - 1; 

  return (
    <div className="bg-card px-4 py-4 border border-border rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">{currentYear}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-6 h-6 p-0"
            onClick={() => setYearShift((prev) => prev - 1)}
            disabled={true}
          >
            <IconWrapper icon={<LuChevronLeft />} />
          </Button>
          <Button
            variant="outline"
            className="w-6 h-6 p-0"
            onClick={() => setYearShift((prev) => prev + 1)}
            disabled={true}
          >
            <IconWrapper icon={<LuChevronRight />} />
          </Button>
        </div>
      </div>
      <div className="justify-between mb-2 hidden sm:flex">
        {months.map((m) => (
          <div key={m} className="text-sm mb-1">
            {m}
          </div>
        ))}
      </div>
      <div className="grid grid-flow-col grid-rows-18 sm:grid-rows-14 md:grid-rows-7 gap-[0.18rem] w-full ">
        {Array(firstDayIndex)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="aspect-square w-full bg-card"></div>
          ))}
        {filledLogs.map((log) => {
          return (
            <div key={log.id} className={`flex justify-center`}>
              <CalendarDay
                data={log}
                habitId={habitId}
                color={color}
                size="grow"
                className={"rounded-sm"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
