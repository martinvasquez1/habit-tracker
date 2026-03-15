import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/new-api-client";
import { ApiUpdateHabitRequest, Habit, HabitColorEnum } from "@repo/open-api";

const updateHabitSchema = z.object({
  name: z.string().min(1).max(36),
  description: z.string().optional(),
  color: z.nativeEnum(HabitColorEnum)
});

export const useUpdateHabitForm = (defaultValues: Habit | undefined) => {
  return useForm<z.infer<typeof updateHabitSchema>>({
    resolver: zodResolver(updateHabitSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      color: defaultValues?.color ?? HabitColorEnum.PINK,
    },
  });
};

export type UpdateHabitInput = z.infer<typeof updateHabitSchema>;

async function updateHabit(data: ApiUpdateHabitRequest) {
  const res = await api.updateHabit(data);
  return res.data;
};

export function useUpdateHabit() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  return mutation;
}
