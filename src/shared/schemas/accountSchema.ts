import { z } from "zod";
import { AccountTypeEnum } from "../enums/accountTypeEnum";

export const accountSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  balance: z.number({
    error: "Saldo é obrigatório",
  }),
  type: z.number({
    error: "Tipo de conta é obrigatório",
  }).refine(
    (val) => Object.values(AccountTypeEnum).includes(val),
    { message: "Tipo de conta inválido" }
  ),
}).superRefine((data, ctx) => {
  if (data.type !== AccountTypeEnum.CREDIT && data.balance < 0) {
    ctx.addIssue({
      code: "too_small",
      origin: "number",
      minimum: 0,
      inclusive: true,
      path: ["balance"],
      message: "Saldo não pode ser negativo",
    });
  }
});