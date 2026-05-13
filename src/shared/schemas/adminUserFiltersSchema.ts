import { z } from "zod";

export const adminUserFiltersSchema = z.object({
  fullName: z.string().optional(),
  nickname: z.string().optional(),
  documentNumber: z.string().optional(),
  role: z.string().optional(),
  createdAtFrom: z.date().optional(),
  createdAtTo: z.date().optional(),
}).refine(
  (data) => {
    if (data.createdAtFrom && data.createdAtTo) {
      return data.createdAtFrom <= data.createdAtTo;
    }
    return true;
  },
  {
    message: "A data inicial deve ser anterior à data final",
    path: ["createdAtFrom"],
  }
);

export type AdminUserFiltersFormValues = z.infer<typeof adminUserFiltersSchema>;
