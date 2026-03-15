import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/new-api-client";
import { ApiCreateLogRequest } from "@repo/open-api";

async function createLog(data: ApiCreateLogRequest) {
  const res = await api.createLog(data);
  return res.data;
};

export function useCreateLog(habitId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createLog,
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
