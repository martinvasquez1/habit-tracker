import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { SignUpDto } from "@/sdk";
import { api } from "@/lib/new-api-client"

async function signUp(data:SignUpDto) {
  const res = await api.signUp({ signUpDto: data });
  return res.data;
}

export function useSignUp() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.accessToken);
      navigate("/home");
    },
  });

  return mutation;
}
