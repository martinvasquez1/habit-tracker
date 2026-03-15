import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/new-api-client";
import { ApiGetUserRequest } from "@repo/open-api";

async function getUser(parameters: ApiGetUserRequest) {
  const res = await api.getUser(parameters);
  return res.data;
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser({ id: userId }),
  });
}
