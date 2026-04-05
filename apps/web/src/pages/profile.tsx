import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import IconWrapper from "@/components/icon-wrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"

import { LuPencil } from "react-icons/lu";
import { jwtDecode } from "jwt-decode";
import { useUser } from "@/features/users/api/get-user";
import { Spinner } from "@/components/ui/spinner";
import Error from "@/components/error";

function ProfilePicture() {
    return (
        <div className="absolute left-8 -bottom-10">
            <div className="size-24 rounded-full overflow-hidden">
                <Avatar className="w-full h-full border-4 border-card">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default function Profile() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return "Error";

    const decoded = jwtDecode(jwt) as { id: string };
    const userId = decoded.id;
    const { data, isLoading, isError } = useUser(userId);

    if (isLoading) return <Spinner />
    if (isError) return <Error />
    if (!data) return <Error />

    const bgColor = "bg-[#ff99fd] bg-[radial-gradient(at_73%_56%,hsla(269,75%,64%,1)_0px,transparent_50%),radial-gradient(at_71%_44%,hsla(243,77%,73%,1)_0px,transparent_50%),radial-gradient(at_88%_10%,hsla(239,67%,75%,1)_0px,transparent_50%),radial-gradient(at_58%_36%,hsla(229,100%,56%,1)_0px,transparent_50%),radial-gradient(at_81%_69%,hsla(154,97%,77%,1)_0px,transparent_50%),radial-gradient(at_45%_25%,hsla(180,89%,60%,1)_0px,transparent_50%),radial-gradient(at_93%_17%,hsla(177,93%,66%,1)_0px,transparent_50%),radial-gradient(at_20%_44%,hsla(284,78%,67%,1)_0px,transparent_50%),radial-gradient(at_70%_1%,hsla(32,90%,61%,1)_0px,transparent_50%)]";

    return (
        <Card className="pt-0">
            <div className="relative">
                <div className={`min-h-32 ${bgColor}`} />
                <ProfilePicture />
            </div>
            <div className="flex flex-row gap-4 pt-7 px-6">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">{data?.username}</h1>
                    <div className="max-w-sm line-clamp-3 pt-2">{data?.bio}</div>
                </div>
                <div>
                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                    /* onClick={() => setShowUnarchived((prev) => !prev)} */
                    >
                        <IconWrapper icon={<LuPencil />} />
                    </Button>
                </div>
            </div>
        </Card>
    )
}