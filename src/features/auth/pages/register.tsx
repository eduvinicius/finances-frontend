import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { RegisterForm } from "../components";
import { useRegister } from "../hooks/useRegister";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "@/lib/axiosError";

export function Register() {
  const { mutate, isPending, error } = useRegister();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (error) toast.error(getErrorMessage(error));
  }, [error]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <img
        src="src/assets/img/fin-verso-logo.png"
        alt="Ícone do FinVerso"
        className="w-48 mb-6"
      />
      <RegisterForm onSubmit={(data) => mutate(data)} loading={isPending} />
      <p className="text-sm text-muted-foreground mt-4">
        Já tem uma conta?{" "}
        <a href="/login" className="text-primary underline underline-offset-2">
          Entrar
        </a>
      </p>
    </div>
  );
}
