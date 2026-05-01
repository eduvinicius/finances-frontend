import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { transactionService } from "../api/transactionService";
import type { TransactionExportRequest } from "@/shared/types/transactions.types";
import { getErrorMessage } from "@/lib/axiosError";
export function useExportTransactions(onSuccess?: () => void): UseMutationResult<Blob, Error, TransactionExportRequest> {
  return useMutation({
    mutationFn: async (request: TransactionExportRequest) => {
      const response = await transactionService.exportTransactions(request);
      return response.data;
    },

    onSuccess: (blob) => {
      const url = globalThis.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transactions_${format(new Date(), 'yyyyMMdd')}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      globalThis.URL.revokeObjectURL(url);

      toast.success("Export successful!");
      onSuccess?.();
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
