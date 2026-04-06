import IconWrapper from "@/components/icon-wrapper";
import { Button } from "@/components/ui/button";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { LuPencil } from "react-icons/lu";

export function UpdateProfile() {
    const form = useUpdateUserForm();
    const updateUserMutation = useUpdateUser({});

    function onSubmit(values) {
        updateUserMutation.mutate(values);
    }
    return (
        <ResponsiveDialog
            title="Lorem"
            description="Lorem"
            isDone={updateUserMutation.isSuccess}
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
            <div>Form here</div>
        </ResponsiveDialog>
    )
}