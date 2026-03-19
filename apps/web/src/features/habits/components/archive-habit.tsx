import { Button } from "@/components/ui/button";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { Habit } from "@repo/open-api";
import { useUpdateHabit } from "../api/update-habit";

type ArchiveItemProps = {
  habitId: number;
  habit: Habit;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ArchiveHabit({
  habitId,
  habit,
  isOpen,
  setIsOpen,
}: ArchiveItemProps) {
  const updateHabitMutation = useUpdateHabit();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newIsArchiveValue = !habit.isArchived;
    const updateHabitDto = { isArchived: newIsArchiveValue };
    updateHabitMutation.mutate({ id: String(habitId), updateHabitDto });
  }

  const archiveAction = habit.isArchived ? "Unarchive" : "Archive";

  return (
    <ResponsiveDialog
      title={`${archiveAction} Habit`}
      description="Are you sure you want to proceed with this action? You can undo it later if needed."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isDone={updateHabitMutation.isSuccess}
    >
      <form onSubmit={onSubmit} className="grid gap-4 mb-4 md:mb-0">
        <div className="flex flex-col gap-2 md:flex-row md:*:flex-1">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
            disabled={updateHabitMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={updateHabitMutation.isPending}
          >
            {archiveAction}
          </Button>
        </div>
      </form>
    </ResponsiveDialog>
  );
}
