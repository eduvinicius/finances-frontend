import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { categoryService } from "../api/categoryService";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { ICategory, ICreateCategoryRequest } from "@/shared/types/category.type";
import { toast } from "sonner";

export function useCreateCategory(): UseMutationResult<ICategory, Error, ICreateCategoryRequest> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories,
      });
    },

    onError: (error) => {
      toast.error(`Erro ao criar categoria: ${error.message}`);
    }
  });
}
