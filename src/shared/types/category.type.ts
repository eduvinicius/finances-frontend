import type z from "zod";
import type { TransactionTypeEnum } from "../enums/transactionTypeEnum";
import type { categorySchema } from "../schemas/categorySchema";
import type { categoriesFiltersSchema } from "../schemas/categoriesFiltersSchema";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "./pagination.types";

export type CategoryFormValues = z.infer<typeof categorySchema>;
export type CategoriesFiltersValues = z.infer<typeof categoriesFiltersSchema>;

export interface ICategoryService {
    getCategoriesPaginated : (pagination: IPaginatedRequest, filters?: CategoriesFiltersValues) => Promise<IPaginatedBaseResponse<ICategory[]>>;
    getAllCategories: () => Promise<ICategory[]>;
    createCategory: (data: CategoryFormValues) => Promise<ICategory>;
}

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