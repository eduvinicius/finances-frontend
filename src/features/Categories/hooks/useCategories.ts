import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { categoryService } from "../api/categoryService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { ICategory } from "@/shared/types/category.type";

export function useCategories(): UseQueryResult<ICategory[], Error> {
  return useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: categoryService.getAllCategories,
  });
}
