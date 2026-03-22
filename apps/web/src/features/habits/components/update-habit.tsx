import { useTranslation } from "react-i18next";

import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { HabitForm } from "./habit-form";

import {
  UpdateHabitInput,
  useUpdateHabit,
  useUpdateHabitForm,
} from "../api/update-habit";
import { Habit } from "@repo/open-api";

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
  const { t } = useTranslation();
  const form = useUpdateHabitForm(habit);
  const updateHabitMutation = useUpdateHabit();

  function onSubmit(values: UpdateHabitInput) {
    updateHabitMutation.mutate({ id: String(habitId), updateHabitDto: values });
  }

  return (
    <ResponsiveDialog
      title={t('habits.update.title')}
      description={t('habits.update.body')}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isDone={updateHabitMutation.isSuccess}
    >
      <HabitForm
        form={form}
        onSubmit={onSubmit}
        mutation={updateHabitMutation}
        submitText={t('habits.update.button')}
      />
    </ResponsiveDialog>
  );
}
