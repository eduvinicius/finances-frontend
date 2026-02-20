import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = new Set(["image/jpeg", "image/jpg", "image/png"]);

export const userSchema = z.object({
    fullName: z.string().min(2, "O nome completo deve conter pelo menos 2 caracteres"),
    nickName: z.string().min(2, "O apelido deve conter pelo menos 2 caracteres"),
    profileImage: z
        .instanceof(File, { message: "Selecione uma imagem válida" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "O tamanho da imagem deve ser menor que 1MB",
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.has(file.type), {
            message: "A imagem deve ser do tipo JPEG, JPG ou PNG",
        })
        .optional()
        .nullable(),
    email: z.email("O email deve ser válido"),
    documentNumber: z.string().min(11, "O número do documento deve conter pelo menos 11 caracteres").optional(),
    phoneNumber: z.string().min(10, "O número de telefone deve conter pelo menos 10 caracteres").optional(),
    address: z.string().min(5, "O endereço deve conter pelo menos 5 caracteres").optional(),
    city: z.string().min(2, "A cidade deve conter pelo menos 2 caracteres").optional(),
    state: z.string().min(2, "O estado deve conter pelo menos 2 caracteres").optional(),
    postalCode: z.string().min(5, "O código postal deve conter pelo menos 5 caracteres").optional(),
    country: z.string().min(2, "O país deve conter pelo menos 2 caracteres").optional(),
    birthDate: z.date(),

});