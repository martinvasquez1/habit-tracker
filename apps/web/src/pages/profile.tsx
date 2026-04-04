import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import IconWrapper from "@/components/icon-wrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"

import { LuPencil } from "react-icons/lu";

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
    const bgColor = "bg-[#ff99fd] bg-[radial-gradient(at_73%_56%,hsla(269,75%,64%,1)_0px,transparent_50%),radial-gradient(at_71%_44%,hsla(243,77%,73%,1)_0px,transparent_50%),radial-gradient(at_88%_10%,hsla(239,67%,75%,1)_0px,transparent_50%),radial-gradient(at_58%_36%,hsla(229,100%,56%,1)_0px,transparent_50%),radial-gradient(at_81%_69%,hsla(154,97%,77%,1)_0px,transparent_50%),radial-gradient(at_45%_25%,hsla(180,89%,60%,1)_0px,transparent_50%),radial-gradient(at_93%_17%,hsla(177,93%,66%,1)_0px,transparent_50%),radial-gradient(at_20%_44%,hsla(284,78%,67%,1)_0px,transparent_50%),radial-gradient(at_70%_1%,hsla(32,90%,61%,1)_0px,transparent_50%)]";

    return (
        <Card className="pt-0">
            <div className="relative">
                <div className={`min-h-32 ${bgColor}`} />
                <ProfilePicture />
            </div>
            <div className="flex flex-row gap-4 pt-7 px-6">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">Emma Smith</h1>
                    <div className="max-w-sm line-clamp-3 pt-2">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit sit quia et magni dolor odit nemo aut aperiam dolore sapiente, fuga iure consequatur soluta assumenda pariatur illo adipisci atque corrupti cum exercitationem modi voluptatibus vero neque? Quos quibusdam ad officiis aperiam nihil sit vel ut dignissimos similique iure corporis, consequatur accusamus minus perferendis dolorem, culpa impedit delectus. Consequatur illo expedita maxime dicta tempore incidunt atque architecto quo eaque ea maiores saepe, numquam iusto debitis magni neque error quia ratione, hic nostrum odit! Neque impedit sed quod nostrum repudiandae? Est optio beatae dolore eveniet recusandae, consequuntur quisquam porro facilis excepturi eius quo asperiores praesentium quae quas necessitatibus repellat, sit quod architecto, facere ab laboriosam. Eum culpa obcaecati facere voluptate ducimus? Tempora beatae aliquam laudantium velit vel nihil temporibus eligendi, eveniet excepturi, laboriosam dolorum quam perferendis optio. Sapiente obcaecati, possimus at maiores velit nulla expedita! Quo, qui enim quidem repellendus placeat itaque! Amet at hic asperiores est culpa mollitia laboriosam aspernatur repellendus, sed voluptates possimus. Aspernatur iste unde quo quidem? Dicta cum quia fugit expedita aspernatur debitis nesciunt voluptatum cupiditate! Minima provident aspernatur perspiciatis quisquam, voluptate earum tenetur porro reprehenderit, beatae ut nemo harum vel ad ratione eaque. Vitae esse doloribus dolorum.
                    </div>
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