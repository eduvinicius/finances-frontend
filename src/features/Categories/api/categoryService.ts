import type { ICategory, ICreateCategoryRequest, CategoriesFiltersValues, ICategoryService } from "@/shared/types/category.type";
import type { AxiosResponse } from "axios";
import { httpClient } from "@/shared/api/httpClient";
import { QUERY_KEYS, getApiEndpoint } from "@/shared/constants/queryKeys";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "@/shared/types/pagination.types";

const baseEndpoint = getApiEndpoint(QUERY_KEYS.categories.all);

export const categoryService: ICategoryService = {

  async getCategoriesPaginated(
    pagination: IPaginatedRequest,
    filters?: CategoriesFiltersValues
  ): Promise<IPaginatedBaseResponse<ICategory[]>> {
    const payload: Record<string, unknown> = {
      page: pagination.page,
      pageSize: pagination.pageSize,
    };

    if (filters?.name) payload.name = filters.name;
    if (filters?.transactionType?.length) payload.type = filters.transactionType.join(',');
    if (filters?.fromDate) payload.fromDate = filters.fromDate.toISOString();
    if (filters?.toDate) payload.toDate = filters.toDate.toISOString();

    const response: AxiosResponse<IPaginatedBaseResponse<ICategory[]>> = await httpClient.post(`/${baseEndpoint}/getAll`, payload);

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