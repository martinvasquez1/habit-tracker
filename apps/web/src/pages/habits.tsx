import { useState } from "react";

import IconWrapper from "@/components/icon-wrapper";
import InfoCard from "@/components/info-card";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

import { LuArchive } from "react-icons/lu";
import { LuStar } from "react-icons/lu";

import { useHabits } from "@/features/habits/api/get-habits";
import CreateHabit from "@/features/habits/components/create-habit";
import HabitListItem from "@/features/habits/components/habit-list-item";

export default function Habits() {
  const page = 1;
  const [showUnarchived, setShowUnarchived] = useState(true);
  let { data, isLoading, isError } = useHabits(page);

  data = showUnarchived
    ? data?.filter((habit) => !habit.isArchived)
    : data?.filter((habit) => habit.isArchived);

  if (isError) return "Error!";

  const noHabits = data?.length === 0;

  return (
    <div>
      <div className="flex justify-between items-baseline">
        <h1 className="font-bold text-2xl mb-6">
          {showUnarchived ? "Habits" : "Archived Habits"}
        </h1>
        <div className="flex gap-4 items-baseline">
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => setShowUnarchived((prev) => !prev)}
          >
            <IconWrapper icon={showUnarchived ? <LuArchive /> : <LuStar />} />
          </Button>
          <CreateHabit />
        </div>
      </div>
      {isLoading && <Spinner />}

      {!isLoading && showUnarchived && noHabits && (
        <InfoCard
          title="No Habits Yet!"
          body="Create habits to improve your routine"
        />
      )}

      {!isLoading && !showUnarchived && noHabits && (
        <InfoCard
          title="No Archived Habits"
          body="Your archive is currently empty"
        />
      )}

      {!isLoading && !noHabits && (
        <ul className="space-y-3">
          {data!.map((habit) => (
            <HabitListItem data={habit} key={habit.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
