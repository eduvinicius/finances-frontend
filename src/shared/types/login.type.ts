export interface LoginFormValues {
    email: string;
    password: string;
};

export interface LoginFormProps {
    onSubmit: (data: LoginFormValues) => void;
    loading?: boolean;
    error?: Error | null;
};

export interface LoginResponse {
  accessToken: string;
}