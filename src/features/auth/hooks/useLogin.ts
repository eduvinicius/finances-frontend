import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/authService";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.token);
      navigate("/home");
    },
  });
}
