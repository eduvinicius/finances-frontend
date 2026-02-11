import { LoginForm } from "@/shared/forms/loginForm";
import type { LoginFormValues } from "@/shared/types/login.type";
import { useLogin } from "../hooks/useLogin";
import { useEffect } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axiosError";

export function Login() {

    const { mutate, isPending, error } = useLogin();
      
    const handleLoginSubmit = (data: LoginFormValues) => {
        mutate(data);
    };

    useEffect(() => {
    if (error) toast.error(getErrorMessage(error));
    }, [error]);

    return (
        <LoginForm 
        onSubmit={handleLoginSubmit} 
        loading={isPending}
        />
    );
}