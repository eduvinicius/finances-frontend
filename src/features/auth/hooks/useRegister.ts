import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/authService";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axiosError";

export function useRegister() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      login(data.token);
      navigate("/home");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
