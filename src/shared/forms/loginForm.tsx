import { Button } from "@/components/ui/Button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/Field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/InputGroup";
import { loginSchema } from "@/shared/schemas/loginSchema";
import type { LoginFormProps, LoginFormValues } from "@/shared/types/login.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdMailOutline, MdVisibilityOff } from "react-icons/md";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

export function LoginForm({ 
    onSubmit, 
    loading
}: Readonly<LoginFormProps>) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <section className="flex flex-col min-h-screen items-center justify-center w-full">
            <img src="src/assets/img/fin-verso-logo.png" alt="Ícone do FinVerso" className="w-87.5" />
            <form
                className="flex flex-col items-center justify-center gap-4 w-full m-5" 
                onSubmit={handleSubmit(onSubmit)}>
                <FieldSet className="w-full max-w-xs">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    id="email"
                                    type="email"
                                    placeholder="Digite o seu e-mail"
                                    autoComplete="email"
                                    aria-invalid={!!errors.email}
                                    {...register("email")}
                                />
                                <InputGroupAddon>
                                    <MdMailOutline />
                                </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription>
                                {errors.email ? errors.email.message : "Digite o seu e-mail"}
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Senha</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    id="password"
                                    type="password"
                                    placeholder="Digite a sua senha"
                                    autoComplete="current-password"
                                    aria-invalid={!!errors.password}
                                    {...register("password")}
                                />
                                <InputGroupAddon>
                                    <MdVisibilityOff />
                                </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription>
                                {errors.password ? errors.password.message : "Deve conter no mínimo 6 caracteres."}
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                    <Button 
                        size="lg"
                        type="submit" 
                        className="w-full" 
                        disabled={loading}>
                        {loading ? "Entrando..." : "Entrar"}
                    </Button>
                    <Button 
                        variant="outline" className="w-full" type="button">
                        <FcGoogle className="size-5 mr-2" />
                        Entrar com Google
                    </Button>
                </FieldSet>
            </form>
        </section>
    );
}