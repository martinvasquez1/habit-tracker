import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/new-api-client";
import { ApiUpdateUserRequest, User } from "@repo/open-api";

const MAX_SIZE = 2 * 1024 * 1024;

const updateUserSchema = z.object({
    username: z.string().min(1).max(36),
    bio: z.string().optional(),
    profilePicture: z
        .instanceof(File)
        .refine(file => file.size <= MAX_SIZE, {
            message: "File too large (max 2MB)"
        })
        .optional(),
    coverPhoto: z
        .instanceof(File)
        .refine(file => file.size <= MAX_SIZE, {
            message: "File too large (max 2MB)"
        })
        .optional(),
});

export const useUpdateUserForm = (defaultValues: User | undefined) => {
    return useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            username: defaultValues?.username,
            bio: defaultValues?.bio ?? '',
        },
    });
};

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

async function updateUser(data: ApiUpdateUserRequest) {
  const res = await api.updateUser(data);
  return res.data;
};

export function useUpdateUser(id: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", id] });
    },
  });

  return mutation;
}