import { z } from "zod";

export const categoriesFiltersSchema = z.object({
    name: z.string().optional(),
    transactionType: z.array(z.number()).optional(),
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
