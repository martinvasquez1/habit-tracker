import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/new-api-client";
import { ApiGetLogsRequest } from "@repo/open-api";

export async function getLogs(data: ApiGetLogsRequest) {
  const res = await api.getLogs(data);
  return res.data;
}

export function useLogs(habitId: number, startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["habits", habitId, "logs"],
    queryFn: () => getLogs({ habitId, startDate, endDate }),
  });
}
