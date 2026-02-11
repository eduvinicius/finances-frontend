import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("E-mail inválido"),
    password: z.string().min(8, "Deve conter no mínimo 8 caracteres."),
});