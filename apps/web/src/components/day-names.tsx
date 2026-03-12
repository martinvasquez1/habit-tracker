import { TableHead } from "./ui/table";
import { generateDateArray } from "@/utils/generate-date-array";
import { formatYYYYMMDD } from "@/utils/format-yyyy-mm-dd";

interface DayNamesProps {
  startDate: Date;
  endDate: Date;
}

export default function DayNames({ startDate, endDate }: DayNamesProps) {
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const days = generateDateArray(startDate, endDate);
  const today = formatYYYYMMDD(new Date());

  return (
    <>
      {days.map((day) => {
        const isMatchingDay = day === today;
        const dayIndex = new Date(day).getDay();

        return (
          <TableHead
            className={`text-center ${isMatchingDay ? "text-primary" : ""}`}
            key={day}
          >
            {dayNames[dayIndex]}
          </TableHead>
        );
      })}
    </>
  );
}
