import { TableHead } from "./ui/table";
import { generateDateArray } from "@/utils/generate-date-array";
import { formatYYYYMMDD } from "@/utils/format-yyyy-mm-dd";
import { useTranslation } from "react-i18next";

interface DayNamesProps {
  startDate: Date;
  endDate: Date;
}

export default function DayNames({ startDate, endDate }: DayNamesProps) {
  const { t } = useTranslation();
  const dayNames = t('common.days', { returnObjects: true }) as string[];

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
