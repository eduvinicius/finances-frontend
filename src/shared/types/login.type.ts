import type { LoginFormValues } from "@/shared/schemas/loginSchema";

export interface LoginFormProps {
    onSubmit: (data: LoginFormValues) => void;
    onGoogleLogin: () => void;
    loading?: boolean;
    googleLoading?: boolean;
};

export interface LoginResponse {
  token: string;
}

export interface GoogleAuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    pictureUrl: string | null;
  };
}