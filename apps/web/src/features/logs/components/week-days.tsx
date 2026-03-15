import { TableCell } from "@/components/ui/table";
import CalendarDay from "./calendar-day";

import { fillMissingLogs } from "@/utils/fill-missing-logs";
import { Habit } from "@repo/open-api";

type WeekDaysProps = {
  habit: Habit;
  startDate: Date;
  endDate: Date;
  insideTable?: boolean;
};

export default function WeekDays({
  habit,
  startDate,
  endDate,
  insideTable = true,
}: WeekDaysProps) {
  const { logs, color, id: habitId } = habit;
  const filledLogs = fillMissingLogs(logs, habitId, startDate, endDate);

  return (
    <>
      {filledLogs.map((log) => {
        if (insideTable) {
          return (
            <TableCell key={log.id}>
              <div className="flex justify-center">
                <CalendarDay data={log} habitId={habitId} color={color} />
              </div>
            </TableCell>
          );
        }

        return (
          <CalendarDay
            key={log.id}
            data={log}
            habitId={habitId}
            color={color}
            size="grow"
          />
        );
      })}
    </>
  );
}
