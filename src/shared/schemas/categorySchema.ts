import { z } from "zod";
import { TransactionTypeEnum } from "@/shared/enums/transactionTypeEnum";

export const categorySchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    type: z.number({
        error: "Tipo de transação é obrigatório",
    }).refine(
        (val) => Object.values(TransactionTypeEnum).includes(val),
        { message: "Tipo de transação inválido" }
    ),
});
