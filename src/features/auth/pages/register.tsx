import { Navigate, Link } from "react-router-dom";
import { RegisterForm } from "../components";
import { useRegister } from "../hooks/useRegister";
import { useAuth } from "../hooks/useAuth";
import { PUBLIC_ROUTES } from "@/shared/constants/routes.cons";

export function Register() {
  const { mutate, isPending } = useRegister();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <img
        src="src/assets/img/fin-verso-logo.png"
        alt="FinVerso"
        className="w-48 mb-6"
      />
      <RegisterForm onSubmit={(data) => mutate(data)} loading={isPending} />
      <p className="text-sm text-muted-foreground mt-4">
        Já tem uma conta?{" "}
        <Link to={PUBLIC_ROUTES.LOGIN} className="text-primary underline underline-offset-2">
          Entrar
        </Link>
      </p>
    </div>
  );
}
