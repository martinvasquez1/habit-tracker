import { useTranslation } from "react-i18next";

import {
  useCreateHabit,
  useCreateHabitForm,
  CreateHabitInput,
} from "../api/create-habit";

import { Button } from "@/components/ui/button";
import IconWrapper from "@/components/icon-wrapper";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { HabitForm } from "./habit-form";

import { LuPlus } from "react-icons/lu";

export default function CreateHabit({}) {
  const { t } = useTranslation();  

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
      title={t('habits.create.title')}
      description={t('habits.create.body')}
      isDone={createHabitMutation.isSuccess}
      triggerButton={
        <Button>
          <IconWrapper icon={<LuPlus />} />
          {t('habits.new_habit_button')}
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
