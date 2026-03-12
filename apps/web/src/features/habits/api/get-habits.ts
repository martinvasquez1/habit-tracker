import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/new-api-client";

async function getHabits() {
  const res = await api.getHabits();
  return res.data;
}

export function useHabits(_page = 1) {
  return useQuery({
    queryKey: ["habits"],
    queryFn: () => getHabits(),
  });
}
