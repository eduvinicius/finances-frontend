import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { categoryService } from "../api/categoryService";
import type { ICategory } from "@/shared/types/category.type";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export function useGetAllCategories(): UseQueryResult<ICategory[], Error> {
    return useQuery({
        queryKey: QUERY_KEYS.categories.getAll(),
        queryFn: categoryService.getAllCategories
    })
}