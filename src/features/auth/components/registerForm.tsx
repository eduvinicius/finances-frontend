import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { registerSchema } from "@/shared/schemas/registerSchema";
import type { RegisterFormProps, RegisterFormValues } from "@/shared/types/register.types";
import { Button } from "@/components/ui/Button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/Field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/InputGroup";
import { BirthDateField, CPFField, FormField, PhoneField } from "@/components/FieldForms";
import { cn } from "@/lib/utils";

export function RegisterForm({ onSubmit, loading }: Readonly<RegisterFormProps>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      nickname: "",
      email: "",
      documentNumber: "",
      phoneNumber: "",
      country: "Brasil",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldSet className="space-y-4 grid grid-cols-2 gap-x-4">
        <FormField
          id="fullName"
          label="Nome Completo"
          type="text"
          placeholder="Digite seu nome completo"
          error={errors.fullName?.message}
          control={control}
          fieldName="fullName"
        />
        <FormField
          id="nickname"
          label="Apelido"
          type="text"
          placeholder="Como quer ser chamado"
          error={errors.nickname?.message}
          control={control}
          fieldName="nickname"
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
          error={errors.email?.message}
          control={control}
          fieldName="email"
        />
        <BirthDateField control={control} error={errors.birthDate?.message} />
        <CPFField control={control} error={errors.documentNumber?.message} />
        <PhoneField control={control} error={errors.phoneNumber?.message} />

        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
              {...register("password")}
            />
            <InputGroupAddon>
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="cursor-pointer"
              >
                {showPassword ? <MdVisibility aria-hidden="true" /> : <MdVisibilityOff aria-hidden="true" />}
              </button>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription id="password-error" className={cn(errors.password && "text-red-500")}>
            {errors.password?.message}
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirmar Senha</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repita sua senha"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby="confirm-password-error"
              {...register("confirmPassword")}
            />
            <InputGroupAddon>
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <MdVisibility aria-hidden="true" /> : <MdVisibilityOff aria-hidden="true" />}
              </button>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription id="confirm-password-error" className={cn(errors.confirmPassword && "text-red-500")}>
            {errors.confirmPassword?.message}
          </FieldDescription>
        </Field>

        <FieldGroup className="col-span-2 space-y-2 pt-1">
          <p className="text-sm text-muted-foreground font-medium">Endereço (Opcional)</p>
          <FormField
            id="address"
            label="Logradouro"
            type="text"
            placeholder="Rua, número, complemento"
            error={errors.address?.message}
            control={control}
            fieldName="address"
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="city"
              label="Cidade"
              type="text"
              placeholder="Cidade"
              error={errors.city?.message}
              control={control}
              fieldName="city"
            />
            <FormField
              id="state"
              label="Estado"
              type="text"
              placeholder="UF"
              error={errors.state?.message}
              control={control}
              fieldName="state"
            />
            <FormField
              id="postalCode"
              label="CEP"
              type="text"
              placeholder="00000-000"
              error={errors.postalCode?.message}
              control={control}
              fieldName="postalCode"
            />
            <FormField
              id="country"
              label="País"
              type="text"
              placeholder="Brasil"
              error={errors.country?.message}
              control={control}
              fieldName="country"
            />
          </div>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}
