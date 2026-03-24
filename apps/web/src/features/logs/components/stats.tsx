import IconWrapper from "@/components/icon-wrapper";
import { Stats } from "@/types/api";

import { TbFlame } from "react-icons/tb";
import { LuAward } from "react-icons/lu";
import { LuHistory } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { HabitColorEnum } from "@repo/open-api";
import { colorsIconWrapper } from "@/styles/main";

interface StatsCardsProps {
  data: Stats;
  color: HabitColorEnum;
}

export default function StatsCards({ data, color }: StatsCardsProps) {
  const { t } = useTranslation()
  const longestStreak = data.streaks ? Math.max(...data.streaks) : 0;

  const iconWrapperStyles = colorsIconWrapper[color];

  const cards = [
    {
      name: t('habit.current_streak'),
      value: data.currentStreak || 0,
      icon: <TbFlame />,
    },
    {
      name: t('habit.longest_streak'),
      value: longestStreak,
      icon: <LuAward />
    },
    {
      name: t('habit.total_logs'),
      value: data.amountOfLogs || 0,
      icon: <LuHistory />
    },
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
              <div className={`${iconWrapperStyles} p-2 rounded-lg`}>
                <IconWrapper icon={c.icon} size="xs" />
              </div>
            </div>
            <div className="font-semibold text-xl">{c.value}</div>
          </div>
        );
      })}
    </div>
  );
}
