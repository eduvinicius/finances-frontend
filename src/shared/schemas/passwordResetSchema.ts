import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("E-mail inválido"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
      .regex(/\d/, "Senha deve conter pelo menos um número"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
