import { Button } from "@/components/ui/Button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/Field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/InputGroup";
import { loginSchema } from "@/shared/schemas/loginSchema";
import type { LoginFormProps, LoginFormValues } from "@/shared/types/loginForm.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOffIcon, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export function LoginForm({ onSubmit }: Readonly<LoginFormProps>) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <section className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle title="Entre na sua conta" />
                    <CardDescription description="Digite seu e-mail abaixo para entrar na sua conta" />
                    <CardAction>
                        <Button variant="link">Cadastre-se</Button>
                    </CardAction>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
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
                                            <MailIcon />
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
                                            <EyeOffIcon />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <FieldDescription>
                                        {errors.password ? errors.password.message : "Deve conter no mínimo 8 caracteres."}
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Entrando..." : "Entrar"}
                        </Button>
                        <Button variant="outline" className="w-full" type="button">
                            Entrar com Google
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </section>
    );
}