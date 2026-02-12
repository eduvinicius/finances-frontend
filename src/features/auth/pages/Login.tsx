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
        <LoginForm 
        onSubmit={handleLoginSubmit} 
        loading={isPending}
        />
    );
}