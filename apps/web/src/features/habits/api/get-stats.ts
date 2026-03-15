import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/new-api-client";
import { ApiGetHabitStatsRequest } from "@repo/open-api";

async function getStats(parameters: ApiGetHabitStatsRequest) {
  const res = await api.getHabitStats(parameters);
  return res.data;
}

export function useStats(habitId: number, currentDate: string) {
  return useQuery({
    queryKey: ["habits", habitId, "streaks"],
    queryFn: () => getStats({ id: habitId, currentDate }),
  });
}
