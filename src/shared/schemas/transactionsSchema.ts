import { z } from "zod";

export const transactionsFiltersSchema = z.object({
  accountIds: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
  type: z.array(z.number()).optional(),
  fromDate: z.date().optional(),
  toDate: z.date().optional(),
}).refine(
  (data) => {
    if (data.fromDate && data.toDate) {
      return data.fromDate <= data.toDate;
    }
    return true;
  },
  {
    message: "A data inicial deve ser anterior à data final",
    path: ["fromDate"],
  }
);

export const transactionFormSchema = z.object({
  accountId: z.string().min(1, "A conta é obrigatória"),
  categoryId: z.string().min(1, "A categoria é obrigatória"),
  amount: z.number().min(0.01, "O valor deve ser maior que 0"),
  type: z.number().min(1, "Selecione um tipo de transação válido"),
  description: z.string().max(255, "A descrição deve ter no máximo 255 caracteres"),
});

export const exportTransactionSchema = z.object({
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z.string().min(1, "Data de fim é obrigatória"),
  categoryId: z.string().optional(),
  accountId: z.string().optional(),
  transactionType: z.string().optional(),
}).refine(
  (data) => data.startDate <= data.endDate,
  {
    message: "A data de início deve ser anterior à data de fim",
    path: ["endDate"],
  }
);

export type ExportTransactionFormValues = z.infer<typeof exportTransactionSchema>;