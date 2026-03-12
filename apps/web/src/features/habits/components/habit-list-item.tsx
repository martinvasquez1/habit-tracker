import { Link } from "react-router";
import { cva } from "class-variance-authority";

import { colors } from "@/styles/main";
import { Habit } from "@/sdk";

import HabitItemDropdown from "./habit-item-dropdown";

const bulletStyles = cva("aspect-square w-4 rounded-full", {
  variants: {
    color: colors,
  },
  defaultVariants: {
    color: null,
  },
});

type HabitListItemProps = {
  data: Habit;
};

export default function HabitListItem({ data }: HabitListItemProps) {
  const color = data.color;

  return (
    <div className="flex justify-between bg-card p-2 px-4 border-[1px] border-border rounded-lg">
      <div className="flex gap-4 items-center">
        <div className="flex justify-center items-center w-3">
          <div className={bulletStyles({ color })}></div>
        </div>
        <Link
          to={`/habits/${data.id}`}
          className="font-semibold hover:underline"
        >
          {data.name}
        </Link>
      </div>
      <div>
        <HabitItemDropdown habitId={data.id} habit={data} />
      </div>
    </div>
  );
}
