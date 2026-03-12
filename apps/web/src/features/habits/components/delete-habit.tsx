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
  const deleteHabitMutation = useDeleteHabit();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    deleteHabitMutation.mutate({id: String(habitId)});
  }

  return (
    <ResponsiveDialog
      title="Delete Habit"
      description="Are you sure you want to delete this habit? This action cannot be undone."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isDone={deleteHabitMutation.isSuccess}
    >
      <form onSubmit={onSubmit} className="grid gap-4 mb-4 md:mb-0">
        <div className="flex flex-col gap-2 md:flex-row">
          <Button
            type="button"
            className="w-full"
            variant="secondary"
            onClick={() => setIsOpen(false)}
            disabled={deleteHabitMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full"
            variant="destructive"
            disabled={deleteHabitMutation.isPending}
          >
            Delete
          </Button>
        </div>
      </form>
    </ResponsiveDialog>
  );
}
