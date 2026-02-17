import type { ICategory, ICreateCategoryRequest } from "@/shared/types/category.type";
import type { AxiosResponse } from "axios";
import { httpClient } from "@/shared/api/httpClient";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { CategoriesFiltersValues } from "@/shared/types/categoriesFilters.type";

const queryKey = QUERY_KEYS.categories.toString();

export const categoryService = {

    async getCategoriesPaginated(filters?: CategoriesFiltersValues): Promise<ICategory[]> {
        const params: Record<string, string | number> = {};
        params.page = "1";
        params.pageSize = "10";
        
        if (filters?.name) params.name = filters.name;
        
        if (filters?.transactionType && filters.transactionType.length > 0) {
            params.type = filters.transactionType.join(',');
        }
        
        if (filters?.fromDate) params.fromDate = filters.fromDate.toISOString();
        
        if (filters?.toDate) params.toDate = filters.toDate.toISOString();
        
        const response: AxiosResponse<ICategory[]> = await httpClient.get(`/${queryKey}/paginated`, {
            params
        });
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