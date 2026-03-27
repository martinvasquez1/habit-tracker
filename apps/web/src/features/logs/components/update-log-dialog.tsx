import { useTranslation } from "react-i18next";

import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { UpdateLogForm } from "@/features/logs/components/update-log-form";

import { Log, LogStatusEnum } from "@repo/open-api";
import { useDeleteLog } from "../api/delete-log";
import {
  UpdateLogInput,
  useUpdateLog,
  useUpdateLogForm,
} from "../api/update-log";
import { useCreateLog } from "../api/create-log";

type UpdateLogDialogProps = {
  habitId: number;
  logId: number;
  log: Log | null;
  date: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdateLogDialog({
  habitId,
  logId,
  log,
  date,
  isOpen,
  setIsOpen,
}: UpdateLogDialogProps) {
  const { t } = useTranslation();

  const fakeLog = log?.status === LogStatusEnum.MISSED;
  if (fakeLog) log = null;

  const form = useUpdateLogForm(log);

  const createLogMutation = useCreateLog(habitId);
  const updateLogMutation = useUpdateLog(logId);
  const deleteLogMutation = useDeleteLog(habitId);

  function onSubmit(values: UpdateLogInput) {
    const shouldCreateLog = fakeLog;
    const shouldRemoveLog = values.status === LogStatusEnum.MISSED;

    if (shouldCreateLog) {
      const createLogDto = { date, status: values.status, note: values.note };
      createLogMutation.mutate({ habitId, createLogDto });
    } else if (shouldRemoveLog) {
      deleteLogMutation.mutate({ habitId, logId });
    } else {
      updateLogMutation.mutate({ habitId, logId, updateLogDto: values });
    }
  }

  const isDone =
    updateLogMutation.isSuccess ||
    deleteLogMutation.isSuccess ||
    createLogMutation.isSuccess;
  const isPending =
    updateLogMutation.isPending ||
    deleteLogMutation.isPending ||
    createLogMutation.isPending;

  return (
    <ResponsiveDialog
      title={t('logs.update.title')}
      description={t('logs.update.body')}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isDone={isDone}
    >
      <UpdateLogForm
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
        submitText={t('logs.update.button')}
      />
    </ResponsiveDialog>
  );
}
