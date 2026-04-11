import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

import { jwtDecode } from "jwt-decode";
import { useUser } from "@/features/users/api/get-user";
import { Spinner } from "@/components/ui/spinner";
import Error from "@/components/error";
import { UpdateProfile } from "@/features/users/components/update-profile";

function ProfilePicture({ url, username }: { url: string | null, username: string }) {
  const firstLetter = username.charAt(0).toUpperCase();

    return (
        <div className="absolute left-6 -bottom-10">
            <div className="size-24 rounded-full overflow-hidden">
                <Avatar className="w-full h-full border-4 border-card">
                    <AvatarImage src={url !== null ? url : undefined} />
                    <AvatarFallback className="text-xl">{firstLetter}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

function CoverPhoto({ url }: { url?: string | null }) {
  const [failed, setFailed] = useState(false);

  if (!url || failed) return <div className="h-32 bg-blue-mesh" />;

  return (
    <img
      src={url}
      className="h-32 w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export default function Profile() {
    const { t } = useTranslation();

    const jwt = localStorage.getItem("jwt");
    if (!jwt) return "Error";

    const decoded = jwtDecode(jwt) as { id: string };
    const userId = decoded.id;
    const { data, isLoading, isError } = useUser(userId);

    if (isLoading) return <Spinner />
    if (isError) return <Error />
    if (!data) return <Error />

    return (
        <Card className="pt-0">
            <div className="relative">
                <CoverPhoto url={data.coverPhoto} />
                <ProfilePicture url={data.profilePicture} username={data.username} />
            </div>
            <div className="flex flex-row gap-4 pt-7 px-6">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">{data.username}</h1>
                    <div className="max-w-sm line-clamp-3 pt-2">
                        {data.bio ?
                            data.bio :
                            <div className="text-card-foreground/40">{t('profile.no_biography')}</div>
                        }
                    </div>
                </div>
                <div><UpdateProfile user={data} /></div>
            </div>
        </Card>
    )
}