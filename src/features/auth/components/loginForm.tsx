import { Button } from "@/components/ui/Button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/Field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/InputGroup";
import { loginSchema, type LoginFormValues } from "@/shared/schemas/loginSchema";
import type { LoginFormProps } from "@/shared/types/login.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdMailOutline, MdVisibilityOff } from "react-icons/md";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { PUBLIC_ROUTES } from "@/shared/constants/routes.cons";
import { cn } from "@/lib/utils";

export function LoginForm({
  onSubmit,
  onGoogleLogin,
  loading,
  googleLoading,
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
    <section aria-labelledby="login-heading" className="flex flex-col min-h-screen items-center justify-center w-full">
      <img src="src/assets/img/fin-verso-logo.png" alt="FinVerso" className="w-87.5" />
      <h1 id="login-heading" className="sr-only">Entrar na sua conta</h1>
      <form
        className="flex flex-col items-center justify-center gap-4 w-full m-5"
        onSubmit={handleSubmit(onSubmit)}
      >
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
                  aria-describedby="email-error"
                  {...register("email")}
                />
                <InputGroupAddon>
                  <MdMailOutline aria-hidden="true" />
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription id="email-error" className={cn(errors.email && "text-red-500")}>
                {errors.email?.message}
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
                  aria-describedby="password-error"
                  {...register("password")}
                />
                <InputGroupAddon>
                  <MdVisibilityOff aria-hidden="true" />
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription id="password-error" className={cn(errors.password && "text-red-500")}>
                {errors.password?.message}
              </FieldDescription>
              <div className="text-right">
                <Link
                  to={PUBLIC_ROUTES.FORGOT_PASSWORD}
                  className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </Field>
          </FieldGroup>
          <Button size="lg" type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={onGoogleLogin}
            disabled={googleLoading}
          >
            <FcGoogle className="size-5 mr-2" aria-hidden="true" />
            {googleLoading ? "Aguardando Google..." : "Entrar com Google"}
          </Button>
        </FieldSet>
      </form>
      <p className="text-sm text-muted-foreground">
        Não tem conta?{" "}
        <Link to="/register" className="text-primary underline underline-offset-2">
          Criar conta
        </Link>
      </p>
    </section>
  );
}
