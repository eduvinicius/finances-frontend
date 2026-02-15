import type { ICategory, ICreateCategoryRequest } from "@/shared/types/category.type";
import type { AxiosResponse } from "axios";
import { httpClient } from "@/shared/api/httpClient";

export const categoryService = {

    async getAllCategories(): Promise<ICategory[]> {
        const response: AxiosResponse<ICategory[]> = await httpClient.get("/categories");
        return response.data;
    },

    async createCategory(
        data: ICreateCategoryRequest
    ): Promise<ICategory> {
        const response = await httpClient.post<ICategory>(
        "/categories",
        data
        );
        return response.data;
    },
}