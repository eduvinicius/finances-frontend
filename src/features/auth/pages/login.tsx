import { LoginForm } from "@/shared/forms/loginForm";
import type { LoginFormValues } from "@/shared/types/login.type";
import { useLogin } from "../hooks/useLogin";
import { useEffect } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axiosError";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export function Login() {

    const { mutate, isPending, error } = useLogin();
    const { isAuthenticated } = useAuth();
      
    const handleLoginSubmit = (data: LoginFormValues) => {
        mutate(data);
    };

    useEffect(() => {
        if (error) toast.error(getErrorMessage(error));
    }, [error]);

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div
            className="flex flex-col-reverse md:grid md:grid-cols-3 h-screen items-center justify-items-center px-4 md:px-0 gap-6 md:gap-0"
        >
            <div className="w-full flex justify-center md:col-span-1">
                <LoginForm
                    onSubmit={handleLoginSubmit}
                    loading={isPending}
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