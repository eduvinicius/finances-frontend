import { z } from "zod";
import { userSchema } from "./userSchema";
import { isValidCPF } from "../utils/cpfValidation";

export const registerSchema = userSchema
  .extend({
    documentNumber: z
      .string()
      .min(1, "CPF é obrigatório")
      .refine(isValidCPF, {
        message: "CPF inválido. Digite um CPF válido no formato XXX.XXX.XXX-XX",
      }),
    country: z.string().min(2, "País é obrigatório"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
