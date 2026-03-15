import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/new-api-client";
import { ApiGetHabitRequest } from "@repo/open-api";

async function getHabit(parameters: ApiGetHabitRequest) {
  const res = await api.getHabit(parameters);
  return res.data;
}

export function useHabit(habitId: string) {
  return useQuery({
    queryKey: ["habits", habitId],
    queryFn: () => getHabit({ id: habitId }),
  });
}
