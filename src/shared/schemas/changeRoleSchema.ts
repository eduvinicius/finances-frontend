import { z } from "zod";

export const changeRoleSchema = z.object({
  role: z.string().min(1, "Selecione um papel"),
});

export type ChangeRoleFormValues = z.infer<typeof changeRoleSchema>;
