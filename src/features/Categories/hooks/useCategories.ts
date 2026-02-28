import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { categoryService } from "../api/categoryService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { ICategory, CategoriesFiltersValues } from "@/shared/types/category.type";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "@/shared/types/pagination.types";

export function useCategories(
  pagination: IPaginatedRequest,
  filters?: CategoriesFiltersValues
): UseQueryResult<IPaginatedBaseResponse<ICategory[]>, Error> {
  return useQuery({
    queryKey: QUERY_KEYS.categories.paginatedList(pagination, filters),
    queryFn: () => categoryService.getCategoriesPaginated(pagination, filters),
  });
}
