import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/responsive-dialog";
import { useDeleteUser } from "../api/delete-user";

type DeleteUserProps = {
    id: number;
};

export default function DeleteUser({ id }: DeleteUserProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { mutate, isSuccess, isPending } = useDeleteUser({
        mutationConfig: { onSuccess: () => { navigate("/") } },
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        mutate({ id });
    }

    return (
        <ConfirmationDialog
            title={t('users.delete.title')}
            description={t('users.delete.body')}
            confirmVariant="destructive"
            onSubmit={onSubmit}
            isDone={isSuccess}
            isPending={isPending}
            triggerButton={<Button type="button" variant="destructive">{t('users.delete.button')}</Button>}
        />
    )
}
