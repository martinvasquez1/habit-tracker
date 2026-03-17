import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IconWrapper from "@/components/icon-wrapper";
import WeekDays from "@/features/logs/components/week-days";
import DayNames from "./day-names";
import Spinner from "./ui/spinner";
import { TbFlameFilled } from "react-icons/tb";

import { useHabitsWithLogs } from "../features/habits/api/get-habits-with-logs";
import InfoCard from "./info-card";
import { formatYYYYMMDD } from "@/utils/format-yyyy-mm-dd";

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

function PaddingRow({ cellCount }: { cellCount: number }) {
  return (
    <TableRow className="h-1 border-none">
      {Array.from({ length: cellCount }).map((_, index) => (
        <TableCell key={index} className="h-0 p-0 m-0"></TableCell>
      ))}
    </TableRow>
  );
}

export function WeeklyCalendar({}) {
  const [weekShift] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + weekShift * 7);

  const monday = getWeekMonday(date);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const today = new Date();

  const mondayStr = formatYYYYMMDD(monday);
  const sundayStr = formatYYYYMMDD(sunday);
  const todayStr = formatYYYYMMDD(today);

  const page = 1;
  const { data, isLoading, isError } = useHabitsWithLogs(
    page,
    mondayStr,
    sundayStr,
    todayStr
  );

  if (isLoading) return <Spinner />;
  if (isError) return "Error!";

  const noHabits = data?.length === 0;
  if (noHabits) {
    return (
      <InfoCard
        title="No Habits Yet!"
        body="Your tracker is waiting for some action!"
      />
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-border hidden sm:block">
        {/* {formatDateRange(monday, sunday)} */}
        <Table className="">
          <TableHeader className="">
            <TableRow className="bg-[#fbfbfd] hover:bg-[#fbfbfb]">
              <TableHead className="min-w-[100px] pl-4 py-3">Habit</TableHead>
              <DayNames startDate={monday} endDate={sunday} />
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-card">
            <PaddingRow cellCount={9} />
            {data?.map((habit) => (
              <TableRow key={habit.id} className="hover:bg-card border-none">
                <TableCell className="font-medium pl-4">{habit.name}</TableCell>
                <WeekDays habit={habit} startDate={monday} endDate={sunday} />
                <TableCell>
                  <div className="flex gap-2 items-end ml-4">
                    <IconWrapper
                      size="sm"
                      icon={<TbFlameFilled />}
                      className="text-gray-300"
                    />
                    <span>{habit.streak}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <PaddingRow cellCount={9} />
          </TableBody>
        </Table>
      </div>
      <div className="bg-card p-4 flex flex-col sm:hidden border border-border rounded-lg space-y-6">
        {data?.map((habit) => (
          <div key={habit.id} className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="font-medium">{habit.name}</h2>
              <div className="flex gap-2 items-end">
                <IconWrapper
                  size="sm"
                  icon={<TbFlameFilled />}
                  className="text-gray-300"
                />
                <span>{habit.streak}</span>
              </div>
            </div>
            <div className="flex justify-between gap-4 min-[500px]:gap-6">
              <WeekDays
                habit={habit}
                startDate={monday}
                endDate={sunday}
                insideTable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/*

function formatDateRange(startDate: Date, endDate: Date) {
  const options = { weekday: "short", month: "short", day: "numeric" };

  const start = startDate.toLocaleDateString("en-US", options);
  const end = endDate.toLocaleDateString("en-US", options);

  return `${start} - ${end}`;
}

<div className="flex gap-2">
  <Button
    variant="outline"
    size="icon"
    onClick={() => setWeekShift((prev) => prev - 1)}
  >
    <IconWrapper icon={<LuChevronLeft />} />
  </Button>
  <Button
    variant="outline"
    size="icon"
    onClick={() => setWeekShift((prev) => prev + 1)}
  >
    <IconWrapper icon={<LuChevronRight />} />
  </Button>
</div>

*/
