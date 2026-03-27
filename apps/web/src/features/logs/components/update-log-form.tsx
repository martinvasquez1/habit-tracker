import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface UpdateLogFormProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  isPending: boolean;
  submitText: string;
}

export const UpdateLogForm: React.FC<UpdateLogFormProps> = ({
  form,
  onSubmit,
  isPending,
  submitText,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} id="update-log-form">
      <FieldGroup>
        <Controller
          name="note"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="note">{t('logs.update.note')}</FieldLabel>
              <Textarea
                {...field}
                id="note"
                placeholder={t('logs.update.note_placeholder')}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
                className="min-h-[120px]"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="status">{t('logs.update.status')}</FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="status"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder={field.value.status}/>
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="skipped">Skipped</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        form="update-log-form"
        className="w-full md:mb-0 mt-6"
        disabled={isPending}
      >
        {submitText}{isPending && ' ...'}
      </Button>
    </form>
  );
};
