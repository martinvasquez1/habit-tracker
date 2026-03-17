import { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import UpdateLogDialog from "./update-log-dialog";

import { Log, LogStatusEnum } from "@repo/open-api";
import { colors } from "@/styles/main";
import { colorsWithHover } from "@/styles/main";

import { useCreateLog } from "../api/create-log";
import { useDeleteLog } from "../api/delete-log";
import { useUpdateLog } from "../api/update-log";

const calendarDayStyles = cva("aspect-square shadow-none", {
  variants: {
    status: {
      [LogStatusEnum.COMPLETED]: "",
      [LogStatusEnum.MISSED]:
        "bg-slate-200 hover:bg-slate-200/75 border-2 border-slate-300/50",
      [LogStatusEnum.SKIPPED]:
        "bg-slate-300 hover:bg-slate-200 border-2 border-slate-400/20 rounded-full ",
    },
    color: colorsWithHover,
    disabled: {
      true: "bg-slate-200 border-2 border-slate-300/50",
    },
    size: {
      default: "",
      grow: "w-full h-full p-0 m-0 md:border",
    },
  },
  defaultVariants: {
    status: LogStatusEnum.MISSED,
    color: "null",
    size: "default",
    disabled: false,
  },
});

type CalendarDayProps = {
  data: Log;
  habitId: number;
  color: keyof typeof colors;
  size?: "default" | "grow";
  className?: string;
};

export default function CalendarDay({
  data,
  habitId,
  color,
  size = "default",
  className,
}: CalendarDayProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const createLogMutation = useCreateLog(habitId);
  const updateLogMutation = useUpdateLog(habitId);
  const deleteLogMutation = useDeleteLog(habitId);

  const { date, status } = data;

  function handleClick() {
    const isComplete = data.status === LogStatusEnum.COMPLETED;
    const isSkipped = data.status === LogStatusEnum.SKIPPED;

    if (isComplete) {
      deleteLogMutation.mutate({ habitId, logId: data.id });
    } else if (isSkipped) {
      const payload = { status: LogStatusEnum.COMPLETED };
      updateLogMutation.mutate({ habitId, logId: data.id, updateLogDto: payload });
    } else {
      const status = LogStatusEnum.COMPLETED;
      const createLogDto = { status, date}
      createLogMutation.mutate({habitId, createLogDto});
    }
  }

  function handleContextMenu(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsFormOpen(true);
  }

  const today = new Date();
  const logDate = new Date(date + "T00:00:00");
  const isDisabled = logDate > today;

  if (status !== LogStatusEnum.COMPLETED) color = "null";

  return (
    <>
      <Button
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        disabled={isDisabled}
        className={cn(
          calendarDayStyles({ status, color, size, disabled: isDisabled }),
          className
        )}
      />
      <UpdateLogDialog
        habitId={habitId}
        logId={data.id}
        log={data}
        date={date}
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
      />
    </>
  );
}
