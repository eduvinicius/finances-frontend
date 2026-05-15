import { z } from "zod";

export const createNotificationSchema = z
  .object({
    title: z.string().min(1, "O título é obrigatório"),
    body: z.string().min(1, "A mensagem é obrigatória"),
    targetingMode: z.union([z.literal(0), z.literal(1), z.literal(2)]),
    deliveryChannel: z.union([z.literal(0), z.literal(1), z.literal(2)]),
    targetUserIds: z.array(z.string().uuid("Cada ID deve ser um UUID válido")).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.targetingMode === 1 || data.targetingMode === 2) {
      if (!data.targetUserIds || data.targetUserIds.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe ao menos um ID de usuário para este modo de envio",
          path: ["targetUserIds"],
        });
      }
    }
  });

export type CreateNotificationDto = z.infer<typeof createNotificationSchema>;
