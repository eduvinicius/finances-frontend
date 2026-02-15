import { z } from "zod";
import type { categorySchema } from "@/shared/schemas/categorySchema";

export type CategoryFormValues = z.infer<typeof categorySchema>;

export interface CategoryFormProps {
    onSubmit: (data: CategoryFormValues) => void;
    loading?: boolean;
}
