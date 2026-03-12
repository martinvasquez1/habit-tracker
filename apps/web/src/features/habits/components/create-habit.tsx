import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/icon-wrapper";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { HabitForm } from "./habit-form";

import {
  useCreateHabit,
  useCreateHabitForm,
  CreateHabitInput,
} from "../api/create-habit";

import { LuPlus } from "react-icons/lu";

export default function CreateHabit({}) {
  const form = useCreateHabitForm();
  const createHabitMutation = useCreateHabit({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
      },
    },
  });

  function onSubmit(values: CreateHabitInput) {
    createHabitMutation.mutate(values);
  }

  return (
    <ResponsiveDialog
      title="Create Habit"
      description="Create a new habit."
      isDone={createHabitMutation.isSuccess}
      triggerButton={
        <Button>
          <IconWrapper icon={<LuPlus />} />
          New habit
        </Button>
      }
    >
      <HabitForm
        form={form}
        onSubmit={onSubmit}
        mutation={createHabitMutation}
        submitText={"Create"}
      />
    </ResponsiveDialog>
  );
}
