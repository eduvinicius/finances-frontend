import { z } from "zod";
import type { categoriesFiltersSchema } from "@/shared/schemas/categoriesFiltersSchema";

export type CategoriesFiltersValues = z.infer<typeof categoriesFiltersSchema>;

export interface CategoriesFiltersProps {
    onFilter: (data: CategoriesFiltersValues) => void;
    onClear?: () => void;
    loading?: boolean;
}
