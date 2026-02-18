import type { ICategory, ICreateCategoryRequest } from "@/shared/types/category.type";
import type { AxiosResponse } from "axios";
import { httpClient } from "@/shared/api/httpClient";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { CategoriesFiltersValues } from "@/shared/types/categoriesFilters.type";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "@/shared/types/pagination.types";

const queryKey = QUERY_KEYS.categories.toString();

export const categoryService = {

    async getCategoriesPaginated(
        pagination: IPaginatedRequest,
        filters?: CategoriesFiltersValues
    ): Promise<IPaginatedBaseResponse<ICategory[]>> {
        const params: Record<string, string | number> = {};
        params.page = pagination.page.toString();
        params.pageSize = pagination.pageSize.toString();
        
        if (filters?.name) params.name = filters.name;
        
        if (filters?.transactionType && filters.transactionType.length > 0) {
            params.type = filters.transactionType.join(',');
        }
        
        if (filters?.fromDate) params.fromDate = filters.fromDate.toISOString();
        
        if (filters?.toDate) params.toDate = filters.toDate.toISOString();
        
        const response: AxiosResponse<IPaginatedBaseResponse<ICategory[]>> = await httpClient.get(`/${queryKey}/paginated`, {
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