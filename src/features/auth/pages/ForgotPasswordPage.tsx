import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { MdMailOutline } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/Field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/InputGroup";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/shared/schemas/passwordResetSchema";
import { useForgotPassword } from "../hooks/usePasswordReset";
import { PUBLIC_ROUTES } from "@/shared/constants/routes.cons";

export function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    mutate(data, {
      onSuccess: () => setSubmitted(true),
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <img
        src="src/assets/img/fin-verso-logo.png"
        alt="Ícone do FinVerso"
        className="w-48 mb-6"
      />

      {submitted ? (
        <div className="w-full max-w-xs text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Se este e-mail estiver cadastrado, você receberá um link de redefinição em breve.
          </p>
          <Link to={PUBLIC_ROUTES.LOGIN} className="text-primary underline underline-offset-2 text-sm">
            Voltar ao login
          </Link>
        </div>
      ) : (
        <form
          className="flex flex-col items-center gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldSet className="w-full max-w-xs">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
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
                <FieldDescription className={errors.email ? "text-red-500" : ""}>
                  {errors.email?.message ?? ""}
                </FieldDescription>
              </Field>
            </FieldGroup>
            <Button size="lg" type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Enviando..." : "Enviar link de redefinição"}
            </Button>
          </FieldSet>
        </form>
      )}

      {!submitted && (
        <p className="text-sm text-muted-foreground mt-4">
          Lembrou a senha?{" "}
          <Link to={PUBLIC_ROUTES.LOGIN} className="text-primary underline underline-offset-2">
            Entrar
          </Link>
        </p>
      )}
    </div>
  );
}
