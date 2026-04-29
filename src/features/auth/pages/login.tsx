import { LoginForm } from "../components";
import type { LoginFormValues } from "@/shared/types/login.type";
import { useLogin } from "../hooks/useLogin";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { useEffect } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axiosError";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ENV } from "@/shared/constants/env";

export function Login() {

  const { mutate, isPending, error } = useLogin();
  const { mutate: googleMutate, isPending: googlePending, error: googleError } = useGoogleLogin();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: ENV.GOOGLE_CLIENT_ID,
      callback: (response) => googleMutate(response.credential),
      cancel_on_tap_outside: true,
    });
  }, []);

  useEffect(() => {
    if (error) toast.error(getErrorMessage(error));
  }, [error]);

  useEffect(() => {
    if (googleError) toast.error(getErrorMessage(googleError));
  }, [googleError]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
        <div
            className="flex flex-col-reverse md:grid md:grid-cols-3 h-screen items-center justify-items-center px-4 md:px-0 gap-6 md:gap-0"
        >
            <div className="w-full flex justify-center md:col-span-1">
                <LoginForm
                    onSubmit={(data: LoginFormValues) => mutate(data)}
                    onGoogleLogin={() => google.accounts.id.prompt()}
                    loading={isPending}
                    googleLoading={googlePending}
                />
            </div>
            <img
                className="w-195 h-165 max-w-xs md:max-w-full md:col-span-2 rounded-3xl md:rounded-[9rem] object-cover mb-8 md:mb-0"
                src="src/assets/img/finance-login-img.jpg"
                alt="Imagem login"
            />
        </div>
  );
}