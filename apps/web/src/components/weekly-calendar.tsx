import { useEffect, useRef  } from "react";

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
import { Spinner } from "./ui/spinner";
import { TbFlameFilled } from "react-icons/tb";
import confetti from "canvas-confetti"

import { useHabitsWithLogs } from "../features/habits/api/get-habits-with-logs";
import InfoCard from "./info-card";
import { formatYYYYMMDD } from "@/utils/format-yyyy-mm-dd";
import { useTranslation } from "react-i18next";

function PaddingRow({ cellCount }: { cellCount: number }) {
  return (
    <TableRow className="h-1 border-none">
      {Array.from({ length: cellCount }).map((_, index) => (
        <TableCell key={index} className="h-0 p-0 m-0"></TableCell>
      ))}
    </TableRow>
  );
}

function ConfettiFireworks({ shouldFire }: { shouldFire: boolean }) {
  const hasFiredRef = useRef(false)

  useEffect(() => {
    if (!shouldFire || hasFiredRef.current) return

    hasFiredRef.current = true

    const duration = 4 * 1000
    const animationEnd = Date.now() + duration
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
    }

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2,
        },
      })

      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [shouldFire])

  return null
}

interface WeeklyCalendarProps {
  monday: Date,
  sunday: Date,
  today: Date 
}

export function WeeklyCalendar({ monday, sunday, today }: WeeklyCalendarProps) {
  const { t } = useTranslation();

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

  const noHabits = data?.length === 0 || !data;
  if (noHabits) {
    return (
      <InfoCard
        title={t('home.empty_state.title')}
        body={t('home.empty_state.body')}
      />
    );
  }

  const allCompletedToday = data.filter((h) => !h.isArchived)
    .every((habit) => habit.logs.some((log) => log.date == todayStr && log.status === "completed"))

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-border hidden sm:block">
        {/* {formatDateRange(monday, sunday)} */}
        <Table className="">
          <TableHeader className="">
            <TableRow>
              <TableHead className="min-w-[100px] pl-4 py-3">{t('common.habit')}</TableHead>
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
                      className={habit.streak > 0 ? "text-orange-500" : "text-gray-300"}
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
            <div className="flex w-full justify-between gap-2 *:flex-1">
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
      <ConfettiFireworks shouldFire={allCompletedToday} />
    </div>
  );
}