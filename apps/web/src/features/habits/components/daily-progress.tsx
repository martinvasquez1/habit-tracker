import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"

import { useHabitsWithLogs } from "@/features/habits/api/get-habits-with-logs";
import { formatYYYYMMDD } from "@/utils/format-yyyy-mm-dd";

interface DailyProgressProps {
    monday: Date,
    sunday: Date,
    today: Date
}

export default function DailyProgress({ monday, sunday, today }: DailyProgressProps) {
    const mondayStr = formatYYYYMMDD(monday);
    const sundayStr = formatYYYYMMDD(sunday);
    const todayStr = formatYYYYMMDD(today);

    const page = 1;
    const { data, isError } = useHabitsWithLogs(
        page,
        mondayStr,
        sundayStr,
        todayStr
    );

    if (isError) return "Error!";
    if (!data || data?.length === 0) return null;

    const completed = data.reduce((count, habit) =>
        count + (habit.logs.some(log => log.date === todayStr && log.status !== "missed") ? 1 : 0),
        0
    );
    const currentProgress = Math.round((completed / data.length) * 100);

    return (
        <Field className="w-full pb-8">
            <FieldLabel>
                <span>Daily Progress</span>
                <span className="ml-auto">{currentProgress}%</span>
            </FieldLabel>
            <Progress value={currentProgress} className="h-4" />
        </Field>
    )
}