import type { z } from "zod";
import type { registerSchema } from "../schemas/registerSchema";

export type RegisterFormValues = z.infer<typeof registerSchema>;

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormValues) => void;
  loading?: boolean;
}
