import { LoginForm } from "@/shared/forms/loginForm";
import type { LoginFormValues } from "@/shared/types/login.type";
import { useLogin } from "../hooks/useLogin";

export function Login() {

      const { mutate, isPending, error } = useLogin();
      
    const handleLoginSubmit = (data: LoginFormValues) => {
        mutate(data);
    };

    return (
        <LoginForm 
        onSubmit={handleLoginSubmit} 
        loading={isPending}
        />
    );
}