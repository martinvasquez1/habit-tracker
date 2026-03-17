import IconWrapper from "@/components/icon-wrapper";
import { Stats } from "@/types/api";

import { TbFlame } from "react-icons/tb";
import { LuAward } from "react-icons/lu";
import { LuHistory } from "react-icons/lu";

interface StatsCardsProps {
  data: Stats;
}

export default function StatsCards({ data }: StatsCardsProps) {
  const longestStreak = data.streaks ? Math.max(...data.streaks) : 0;

  const cards = [
    {
      name: "Current Streak",
      value: data.currentStreak || 0,
      icon: <TbFlame />,
    },
    { name: "Longest Streak", value: longestStreak, icon: <LuAward /> },
    { name: "Total Logs", value: data.amountOfLogs || 0, icon: <LuHistory /> },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-6">
      {cards.map((c) => {
        return (
          <div
            key={c.name}
            className="flex-1 border border-border rounded-md p-4 bg-card"
          >
            <div className="flex justify-between items-baseline gap-4">
              <div className="font-semibold text-lg pb-2">{c.name}</div>
              <IconWrapper icon={c.icon} size="xs" color="black" />
            </div>
            <div className="font-semibold text-xl">{c.value}</div>
          </div>
        );
      })}
    </div>
  );
}
