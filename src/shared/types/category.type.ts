import type z from "zod";
import type { TransactionTypeEnum } from "../enums/transactionTypeEnum";
import type { categorySchema } from "../schemas/categorySchema";
import type { categoriesFiltersSchema } from "../schemas/categoriesFiltersSchema";

export type CategoryFormValues = z.infer<typeof categorySchema>;
export type CategoriesFiltersValues = z.infer<typeof categoriesFiltersSchema>;

export interface ICategory {
    id: string;
    userId: string;
    name: string;
    type: TransactionTypeEnum;
    description: string;
}

export interface ICreateCategoryRequest {
    name: string;
    type: TransactionTypeEnum;
    description: string;
}
export interface CategoriesListProps {
    data: ICategory[];
}