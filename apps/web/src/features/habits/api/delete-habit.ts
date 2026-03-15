import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/new-api-client";
import { ApiDeleteHabitRequest } from "@repo/open-api";

async function deleteHabit(data: ApiDeleteHabitRequest) {
  const res = await api.deleteHabit(data);
  return res.data;
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  return mutation;
}
