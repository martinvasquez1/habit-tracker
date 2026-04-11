import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/new-api-client";
import { ApiDeleteUserRequest } from "@repo/open-api";

async function deleteUser(data: ApiDeleteUserRequest) {
  const res = await api.deleteUser(data);
  return res.data;
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return mutation;
}