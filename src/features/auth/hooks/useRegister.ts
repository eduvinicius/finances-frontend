import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/authService";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (token) => {
      login(token);
      navigate("/");
    },
  });
}
