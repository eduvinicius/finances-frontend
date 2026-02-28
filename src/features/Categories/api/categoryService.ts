import type { ICategory, ICreateCategoryRequest, CategoriesFiltersValues, ICategoryService } from "@/shared/types/category.type";
import type { AxiosResponse } from "axios";
import { httpClient } from "@/shared/api/httpClient";
import { QUERY_KEYS, getApiEndpoint } from "@/shared/constants/queryKeys";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "@/shared/types/pagination.types";

const baseEndpoint = getApiEndpoint(QUERY_KEYS.categories.all);
const paginatedEndpoint = getApiEndpoint(QUERY_KEYS.categories.paginated());

export const categoryService: ICategoryService = {

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
        
        const response: AxiosResponse<IPaginatedBaseResponse<ICategory[]>> = await httpClient.get(`/${paginatedEndpoint}`, {
            params
        });
        
        return response.data;
    },

    async getAllCategories(): Promise<ICategory[]> {
        const response = await httpClient.get<ICategory[]>(`/${baseEndpoint}`);
        return response.data;
    },

    async createCategory(
        data: ICreateCategoryRequest
    ): Promise<ICategory> {
        const response = await httpClient.post<ICategory>(
        `/${baseEndpoint}`,
        data
        );
        return response.data;
    },
}