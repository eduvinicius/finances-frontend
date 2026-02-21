import { z } from "zod";
import { isValidCPF } from "../utils/cpfValidation";
import { isValidPhoneNumber } from "../utils/phoneNumberMask";

export const userSchema = z.object({
    fullName: z.string().min(2, "O nome completo deve conter pelo menos 2 caracteres"),
    nickname: z.string().min(2, "O apelido deve conter pelo menos 2 caracteres"),
    email: z.email("O email deve ser válido"),
    documentNumber: z
        .string()
        .optional()
        .refine(
            (value) => !value || value === "" || isValidCPF(value),
            {
                message: "CPF inválido. Digite um CPF válido no formato XXX.XXX.XXX-XX",
            }
        ),
    phoneNumber: z
        .string()
        .optional()
        .refine(
            (value) => !value || value === "" || isValidPhoneNumber(value),
            {
                message: "Telefone inválido. Digite um número válido no formato (XX) XXXXX-XXXX",
            }
        ),
    address: z.string().min(5, "O endereço deve conter pelo menos 5 caracteres").optional(),
    city: z.string().min(2, "A cidade deve conter pelo menos 2 caracteres").optional(),
    state: z.string().min(2, "O estado deve conter pelo menos 2 caracteres").optional(),
    postalCode: z.string().min(5, "O código postal deve conter pelo menos 5 caracteres").optional(),
    country: z.string().min(2, "O país deve conter pelo menos 2 caracteres").optional(),
    birthDate: z.date(),

});