import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authService } from "../api/authService";
import { getErrorMessage } from "@/lib/axiosError";
import { PUBLIC_ROUTES } from "@/shared/constants/routes.cons";

export function useForgotPassword() {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success("Senha atualizada! Faça login com a nova senha.");
      navigate(PUBLIC_ROUTES.LOGIN);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
