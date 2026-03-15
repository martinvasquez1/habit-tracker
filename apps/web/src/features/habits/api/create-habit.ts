import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MutationConfig } from "@/lib/react-query";
import { api } from "@/lib/new-api-client";

import { CreateHabitDto, HabitColorEnum } from "@repo/open-api";

const createHabitSchema = z.object({
  name: z.string().min(1).max(36),
  description: z.string().optional(),
  color: z.nativeEnum(HabitColorEnum),
});

export const useCreateHabitForm = () => {
  return useForm<z.infer<typeof createHabitSchema>>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "red",
    },
  });
};

export type CreateHabitInput = z.infer<typeof createHabitSchema>;

async function createHabit(data: CreateHabitDto) {
  const res = await api.createHabit({ createHabitDto: data });
  return res.data;
};

type UseCreateHabitOptions = {
  mutationConfig?: MutationConfig<typeof createHabit>;
};

export function useCreateHabit({ mutationConfig }: UseCreateHabitOptions) {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  const mutation = useMutation({
    mutationFn: createHabit,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });

  return mutation;
}
