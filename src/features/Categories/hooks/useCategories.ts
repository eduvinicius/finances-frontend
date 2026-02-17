import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { categoryService } from "../api/categoryService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { ICategory } from "@/shared/types/category.type";
import type { CategoriesFiltersValues } from "@/shared/types/categoriesFilters.type";

export function useCategories(filters?: CategoriesFiltersValues): UseQueryResult<ICategory[], Error> {
  return useQuery({
    queryKey: [...QUERY_KEYS.categories, filters],
    queryFn: () => categoryService.getCategoriesPaginated(filters),
  });
}
