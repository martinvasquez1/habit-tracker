import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { HabitForm } from "./habit-form";

import {
  UpdateHabitInput,
  useUpdateHabit,
  useUpdateHabitForm,
} from "../api/update-habit";
import { Habit } from "@/sdk";

type UpdateItemProps = {
  habitId: number;
  habit: Habit;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdateHabit({
  habitId,
  habit,
  isOpen,
  setIsOpen,
}: UpdateItemProps) {
  const form = useUpdateHabitForm(habit);
  const updateHabitMutation = useUpdateHabit();

  function onSubmit(values: UpdateHabitInput) {
    updateHabitMutation.mutate({ id: String(habitId), updateHabitDto: values });
  }

  return (
    <ResponsiveDialog
      title="Update Habit"
      description="Update habit information."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isDone={updateHabitMutation.isSuccess}
    >
      <HabitForm
        form={form}
        onSubmit={onSubmit}
        mutation={updateHabitMutation}
        submitText={"Update"}
      />
    </ResponsiveDialog>
  );
}
