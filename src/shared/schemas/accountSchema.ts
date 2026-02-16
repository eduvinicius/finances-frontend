import { z } from "zod";
import { AccountTypeEnum } from "../enums/accountTypeEnum";

export const accountSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    balance: z.number({
        error: "Saldo é obrigatório",
    }).min(0, "Saldo não pode ser negativo"),
    type: z.number({
        error: "Tipo de conta é obrigatório",
    }).refine(
        (val) => Object.values(AccountTypeEnum).includes(val),
        { message: "Tipo de conta inválido" }
    ),
});