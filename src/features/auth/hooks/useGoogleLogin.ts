import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/authService";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axiosError";
import { ENV } from "@/shared/constants/env";

export function useGoogleLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialized = useRef(false);

  const mutation = useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: (data) => {
      login(data.token);
      navigate("/home");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    google.accounts.id.initialize({
      client_id: ENV.GOOGLE_CLIENT_ID,
      callback: (response) => mutation.mutate(response.credential),
      cancel_on_tap_outside: true,
    });
  }, [mutation]);

  return mutation;
}
