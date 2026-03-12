import { useQuery } from "@tanstack/react-query";

import { ApiGetHabitsWithLogsRequest } from "@/sdk";
import { api } from "@/lib/new-api-client"

async function getHabitsWithLogs(parameters: ApiGetHabitsWithLogsRequest) {
  const res = await api.getHabitsWithLogs(parameters);
  return res.data;
} 

export function useHabitsWithLogs(
  _page = 1,
  startDate: string,
  endDate: string,
  currentDate: string
) {
  return useQuery({
    queryKey: ["habits", "logs", startDate, endDate],
    queryFn: () => getHabitsWithLogs({startDate, endDate, currentDate}),
  });
}
