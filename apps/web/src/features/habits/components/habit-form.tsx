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

export const HabitForm: React.FC<HabitFormProps> = ({
  form,
  onSubmit,
  mutation,
  submitText,
}) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} id="habit-form">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                placeholder="Meditate"
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
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                {...field}
                id="description"
                type="text"
                placeholder="I'll meditate every day for 5 minutes."
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
                <FieldLabel htmlFor="habit-color">Color</FieldLabel>
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
                        <span className="capitalize">{name}</span>
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
        className="w-full md:mb-0 mb-4"
        disabled={mutation.isPending}
      >
        {submitText}{mutation.isPending && ' ...'}
      </Button>
    </form>
  );
};