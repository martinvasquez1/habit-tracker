import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/new-api-client";
import { ApiDeleteUserRequest } from "@repo/open-api";

async function deleteUser(data: ApiDeleteUserRequest) {
  const res = await api.deleteUser(data);
  return res.data;
}

type UseDeleteUserOptions = {
  mutationConfig?: MutationConfig<typeof deleteUser>;
};

export function useDeleteUser({ mutationConfig }: UseDeleteUserOptions) {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...restConfig,
  });

  return mutation;
}