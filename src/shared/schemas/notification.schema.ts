import { z } from "zod";

export const createNotificationSchema = z
  .object({
    title: z.string().min(1, "O título é obrigatório"),
    body: z.string().min(1, "A mensagem é obrigatória"),
    targetingMode: z.union([z.literal(0), z.literal(1), z.literal(2)]),
    deliveryChannel: z.union([z.literal(0), z.literal(1), z.literal(2)]),
    targetUserIds: z.array(z.uuid({ error: "Cada ID deve ser um UUID válido" })).default([]),
  })
  .superRefine((data, ctx) => {
    if (data.targetingMode === 1 || data.targetingMode === 2) {
      if (data.targetUserIds.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Informe ao menos um usuário para este modo de envio",
          path: ["targetUserIds"],
        });
      }
    }
  });

export type CreateNotificationInput = z.input<typeof createNotificationSchema>;
export type CreateNotificationDto = z.output<typeof createNotificationSchema>;
