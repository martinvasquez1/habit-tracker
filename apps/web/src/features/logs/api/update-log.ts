import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/new-api-client";
import { LogStatusEnum, ApiUpdateLogRequest, Log } from "@repo/open-api";

const updateLogSchema = z.object({
  note: z.string().max(300),
  status: z.enum([LogStatusEnum.COMPLETED, LogStatusEnum.MISSED, LogStatusEnum.SKIPPED]),
});

export const useUpdateLogForm = (defaultValues: Log | null) => {
  return useForm<z.infer<typeof updateLogSchema>>({
    resolver: zodResolver(updateLogSchema),
    defaultValues: {
      note: defaultValues?.note ?? "",
      status: defaultValues?.status ?? LogStatusEnum.COMPLETED,
    },
  });
};

export type UpdateLogInput = z.infer<typeof updateLogSchema>;

async function updateLog(data: ApiUpdateLogRequest) {
  const res = await api.updateLog(data);
  return res.data;
}

export function useUpdateLog(habitId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateLog,
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
