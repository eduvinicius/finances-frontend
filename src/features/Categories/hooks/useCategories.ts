import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { categoryService } from "../api/categoryService";
import { queryKeys } from "@/shared/constants/queryKeys";
import type { ICategory } from "@/shared/types/category.type";

export function useCategories(): UseQueryResult<ICategory[], Error> {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: categoryService.getAllCategories,
  });
}
