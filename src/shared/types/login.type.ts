import type { LoginFormValues } from "@/shared/schemas/loginSchema";
import type { UserRole } from "@/shared/types/authContext.type";

export interface LoginFormProps {
    onSubmit: (data: LoginFormValues) => void;
    onGoogleLogin: () => void;
    loading?: boolean;
    googleLoading?: boolean;
};

export interface LoginResponse {
  token: string;
  role: UserRole;
}

export interface GoogleAuthResponse {
  token: string;
  role: UserRole;
  user: {
    id: string;
    email: string;
    name: string;
    pictureUrl: string | null;
  };
}