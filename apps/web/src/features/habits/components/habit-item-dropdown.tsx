import IconWrapper from "@/components/icon-wrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuEllipsisVertical } from "react-icons/lu";

import UpdateHabit from "./update-habit";
import ArchiveHabit from "./archive-habit";
import DeleteHabit from "./delete-habit";

import { useState } from "react";
import { Habit } from "@repo/open-api";

type HabitItemDropdwonProps = {
  habitId: number;
  habit: Habit;
};

export default function HabitItemDropdown({
  habitId,
  habit,
}: HabitItemDropdwonProps) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconWrapper icon={<LuEllipsisVertical />} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => setIsUpdateOpen(true)}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsArchiveOpen(true)}>
            {habit.isArchived ? "Unarchive" : "Archive"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateHabit
        habitId={habitId}
        habit={habit}
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
      />
      <ArchiveHabit
        habitId={habitId}
        habit={habit}
        isOpen={isArchiveOpen}
        setIsOpen={setIsArchiveOpen}
      />
      <DeleteHabit
        habitId={habitId}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />
    </>
  );
}
