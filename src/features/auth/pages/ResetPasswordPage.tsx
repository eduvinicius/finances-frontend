import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/Field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/InputGroup";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/shared/schemas/passwordResetSchema";
import { useResetPassword } from "../hooks/usePasswordReset";
import { PUBLIC_ROUTES } from "@/shared/constants/routes.cons";

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  if (!token || !email) {
    return <Navigate to={PUBLIC_ROUTES.FORGOT_PASSWORD} replace />;
  }

  const onSubmit = (data: ResetPasswordFormValues) => {
    mutate({ token, email, newPassword: data.newPassword, confirmPassword: data.confirmPassword });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <img
        src="src/assets/img/fin-verso-logo.png"
        alt="Ícone do FinVerso"
        className="w-48 mb-6"
      />

      <form
        className="flex flex-col items-center gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldSet className="w-full max-w-xs">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="newPassword">Nova senha</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  placeholder="Digite a nova senha"
                  autoComplete="new-password"
                  aria-invalid={!!errors.newPassword}
                  {...register("newPassword")}
                />
                <InputGroupAddon
                  className="cursor-pointer"
                  onClick={() => setShowNew((v) => !v)}
                >
                  {showNew ? <MdVisibility /> : <MdVisibilityOff />}
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className={errors.newPassword ? "text-red-500" : ""}>
                {errors.newPassword?.message ?? ""}
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirmar senha</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirme a nova senha"
                  autoComplete="new-password"
                  aria-invalid={!!errors.confirmPassword}
                  {...register("confirmPassword")}
                />
                <InputGroupAddon
                  className="cursor-pointer"
                  onClick={() => setShowConfirm((v) => !v)}
                >
                  {showConfirm ? <MdVisibility /> : <MdVisibilityOff />}
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className={errors.confirmPassword ? "text-red-500" : ""}>
                {errors.confirmPassword?.message ?? ""}
              </FieldDescription>
            </Field>
          </FieldGroup>

          <Button size="lg" type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Salvando..." : "Redefinir senha"}
          </Button>
        </FieldSet>
      </form>

      <p className="text-sm text-muted-foreground mt-4">
        <Link to={PUBLIC_ROUTES.LOGIN} className="text-primary underline underline-offset-2">
          Voltar ao login
        </Link>
      </p>
    </div>
  );
}
