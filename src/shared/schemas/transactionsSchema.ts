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
  exportScope: z.enum(["current", "all"]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  categoryId: z.string().optional(),
  accountId: z.string().optional(),
  transactionType: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.exportScope !== "current") {
    return;
  }
  const hasStart = Boolean(data.startDate && data.startDate.length > 0);
  const hasEnd = Boolean(data.endDate && data.endDate.length > 0);
  if (!hasStart) {
    ctx.addIssue({ code: "custom", message: "Data de início é obrigatória", path: ["startDate"] });
  }
  if (!hasEnd) {
    ctx.addIssue({ code: "custom", message: "Data de fim é obrigatória", path: ["endDate"] });
  }
  if (hasStart && hasEnd && data.startDate! > data.endDate!) {
    ctx.addIssue({ code: "custom", message: "A data de início deve ser anterior à data de fim", path: ["endDate"] });
  }
});

export type ExportTransactionFormValues = z.infer<typeof exportTransactionSchema>;