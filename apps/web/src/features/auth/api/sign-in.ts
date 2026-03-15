import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { SignInDto } from "@repo/open-api";
import { api } from "@/lib/new-api-client"

async function signIn(data:SignInDto) {
  const res = await api.signIn({ signInDto: data });
  return res.data;
}

export function useSignIn() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.accessToken);
      navigate("/home");
    },
  });

  return mutation;
}
