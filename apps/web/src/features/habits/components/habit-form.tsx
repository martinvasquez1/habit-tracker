import { useTranslation } from "react-i18next";
import { Controller, UseFormReturn } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { colors } from "@/styles/main";

interface HabitFormProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  mutation: UseMutationResult<any, unknown, any>;
  submitText: string;
}

/* Generic form to create and update habit */
export const HabitForm: React.FC<HabitFormProps> = ({
  form,
  onSubmit,
  mutation,
  submitText,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} id="habit-form">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">{t('habits.update.name')}</FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                placeholder={t('habits.update.name_placeholder')}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">{t('habits.update.description')}</FieldLabel>
              <Input
                {...field}
                id="description"
                type="text"
                placeholder={t('habits.update.description_placeholder')}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="color"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="habit-color">{t('habits.update.color')}</FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="habit-color"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  {Object.entries(colors).map(([name, className]) => (
                    <SelectItem key={name} value={name}>
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${className} mr-2`}
                        />
                        <span className="capitalize">{t(`common.colors.${name}`)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        form="habit-form"
        className="w-full md:mb-0 mt-6"
        disabled={mutation.isPending}
      >
        {submitText}{mutation.isPending && ' ...'}
      </Button>
    </form>
  );
};