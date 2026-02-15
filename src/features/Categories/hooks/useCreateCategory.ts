import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { categoryService } from "../api/categoryService";
import { queryKeys } from "@/shared/constants/queryKeys";
import type { ICategory, ICreateCategoryRequest } from "@/shared/types/category.type";

export function useCreateCategory(): UseMutationResult<ICategory, Error, ICreateCategoryRequest> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories,
      });
    },
  });
}
