import type { ICategory, ICreateCategoryRequest } from "@/shared/types/category.type";
import type { AxiosResponse } from "axios";
import { httpClient } from "@/shared/api/httpClient";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

const queryKey = QUERY_KEYS.categories.toString();

export const categoryService = {

    async getAllCategories(): Promise<ICategory[]> {
        const response: AxiosResponse<ICategory[]> = await httpClient.get(`/${queryKey}`);
        return response.data;
    },

    async createCategory(
        data: ICreateCategoryRequest
    ): Promise<ICategory> {
        const response = await httpClient.post<ICategory>(
        `/${queryKey}`,
        data
        );
        return response.data;
    },
}