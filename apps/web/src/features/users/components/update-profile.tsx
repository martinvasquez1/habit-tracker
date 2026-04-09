import IconWrapper from "@/components/icon-wrapper";
import { Button } from "@/components/ui/button";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { LuPencil } from "react-icons/lu";

import { Controller } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { UpdateUserInput, useUpdateUser, useUpdateUserForm } from "@/features/users/api/update-user";
import { User } from "@repo/open-api";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/textarea";

interface UpdateProfileProps {
    user: User;
}

export function UpdateProfile({ user }: UpdateProfileProps) {
    const { t } = useTranslation();

    const form = useUpdateUserForm(user);
    const { mutate, isSuccess, isPending } = useUpdateUser(user.id);

    function onSubmit(values: UpdateUserInput) {
        mutate({ id: user.id, ...values });
    }

    return (
        <ResponsiveDialog
            title="Lorem"
            description="Lorem"
            isDone={isSuccess}
            triggerButton={
                <Button
                    type="button"
                    size="icon"
                    variant="outline"
                >
                    <IconWrapper icon={<LuPencil />} />
                </Button>
            }
        >
            <form onSubmit={form.handleSubmit(onSubmit)} id="habit-form">
                <FieldGroup>
                    <Controller
                        name="username"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="username">{t('users.update.name')}</FieldLabel>
                                <Input
                                    {...field}
                                    id="username"
                                    type="text"
                                    placeholder={t('users.update.name_placeholder')}
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
                        name="bio"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="bio">{t('users.update.bio')}</FieldLabel>
                                <Textarea
                                    {...field}
                                    id="bio"
                                    placeholder={t('users.update.bio')}
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    className="min-h-[90px]"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="profilePicture"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="profilePicture">{t('users.update.profilePicture')}</FieldLabel>
                                <Input
                                    id="profilePicture"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        field.onChange(file);
                                    }}
                                    onSubmit={() => field.value = undefined}
                                    aria-invalid={fieldState.invalid}
                                    className="p-2"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="coverPhoto"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="coverPhoto">{t('users.update.coverPhoto')}</FieldLabel>
                                <Input
                                    id="coverPhoto"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        field.onChange(file);
                                    }}
                                    onSubmit={() => field.value = undefined}
                                    aria-invalid={fieldState.invalid}
                                    className="p-2"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                </FieldGroup>
                <Button
                    type="submit"
                    form="habit-form"
                    className="w-full md:mb-0 mt-6"
                    disabled={isPending}
                >
                    {t('user.update.button')}{isPending && ' ...'}
                </Button>
            </form>

        </ResponsiveDialog>
    )
}