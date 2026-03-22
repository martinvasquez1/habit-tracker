import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { useDeleteHabit } from "../api/delete-habit";

type DeleteItemProps = {
  habitId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteHabit({
  habitId,
  isOpen,
  setIsOpen,
}: DeleteItemProps) {
  const { t } = useTranslation();
  const deleteHabitMutation = useDeleteHabit();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    deleteHabitMutation.mutate({id: String(habitId)});
  }

  return (
    <ResponsiveDialog
      title={t('habits.delete.title')}
      description={t('habits.delete.body')}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isDone={deleteHabitMutation.isSuccess}
    >
      <form onSubmit={onSubmit} className="grid gap-4 mb-4 md:mb-0">
        <div className="flex flex-col gap-2 md:flex-row md:*:flex-1">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
            disabled={deleteHabitMutation.isPending}
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            variant="destructive"
            disabled={deleteHabitMutation.isPending}
          >
            {t('habits.delete.button')}
          </Button>
        </div>
      </form>
    </ResponsiveDialog>
  );
}
