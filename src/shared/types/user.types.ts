import type z from "zod";
import type { userSchema } from "../schemas/userSchema";

export type UserFormValues = z.infer<typeof userSchema>;