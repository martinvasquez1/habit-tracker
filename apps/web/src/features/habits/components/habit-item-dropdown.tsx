import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Habit } from "@repo/open-api";

import IconWrapper from "@/components/icon-wrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuArchive, LuEllipsisVertical, LuPencil, LuTrash } from "react-icons/lu";

import UpdateHabit from "./update-habit";
import ArchiveHabit from "./archive-habit";
import DeleteHabit from "./delete-habit";

type HabitItemDropdwonProps = {
  habitId: number;
  habit: Habit;
};

export default function HabitItemDropdown({
  habitId,
  habit,
}: HabitItemDropdwonProps) {
  const { t } = useTranslation();

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
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsUpdateOpen(true)}>
            <LuPencil />
            {t('habits.item_options.update')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsArchiveOpen(true)}>
            <LuArchive />
            {habit.isArchived ? t('habits.item_options.unarchive') : t('habits.item_options.archive')}
          </DropdownMenuItem>

          <DropdownMenuSeparator/>

          <DropdownMenuItem onClick={() => setIsDeleteOpen(true)} variant="destructive">
            <LuTrash />
            {t('habits.item_options.delete')}
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
