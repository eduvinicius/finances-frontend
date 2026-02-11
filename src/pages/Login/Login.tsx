import { LoginForm } from "@/shared/forms/loginForm";
import type { LoginFormValues } from "@/shared/types/loginForm.type";

export function Login() {
    const handleLoginSubmit = async (data: LoginFormValues) => {
        console.log("Form submitted:", data);
    };

    return (
        <LoginForm onSubmit={handleLoginSubmit} />
    );
}