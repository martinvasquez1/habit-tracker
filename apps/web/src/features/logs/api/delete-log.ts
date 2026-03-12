import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/new-api-client";
import { ApiDeleteLogRequest } from "@/sdk";

export async function deleteLog(data: ApiDeleteLogRequest) {
  const res = await api.deleteLog(data);
  return res.data;
}

export function useDeleteLog(habitId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteLog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.every(
            (_key) => ["habits", "logs"],
            ["habits", habitId, "logs"]
          ),
      });
    },
  });

  return mutation;
}
