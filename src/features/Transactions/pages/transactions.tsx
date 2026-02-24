import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import { useGetAllTransactions } from "../hooks/useGetAllTransactions";
import { Spinner } from "@/components/ui/Spinner";
import { TransactionsForm } from "../components";
import { AppPaginator } from "@/components/ui/Paginator/appPaginator";
import { AppDialog } from "@/components/AppDialog";
import type { TransactionFiltersValues, TransactionFormValues } from "@/shared/types/transactions.types";

export function Transactions() {

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TransactionFiltersValues | undefined>(undefined);
  const { data, isLoading, error } = useGetAllTransactions({ page: currentPage, pageSize }, filters ?? {});
  const { mutate, isPending } = useCreateTransaction();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalPages = useMemo(
      () => Math.ceil((data?.totalCount ?? 0) / pageSize),
      [data?.totalCount, pageSize]
  );

  const handleFormSubmit = (formData: TransactionFormValues) => {
    console.log("Form data submitted:", formData);
    //   mutate(formData, {
    //       onSuccess: () => {
    //           setIsDialogOpen(false);
    //       },
    //   });
  };

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">Transações</h1>
         <AppDialog
            buttonText="Nova Transação"
            headerTitle="Criar Nova Transação"
            description="Preencha os campos abaixo para criar uma nova transação."
            component={ isPending ? <Spinner className="mx-auto my-4 w-10 h-10" /> : <TransactionsForm onSubmit={handleFormSubmit} /> }
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
         />
      </header>

        {/* {isLoading ? <TransactionsListSkeleton /> : <TransactionsList data={data?.items ?? []} />} */}
        {data?.totalCount === 0 && !isLoading && (
            <p className="text-center text-muted-foreground mt-10">Nenhuma transação encontrada. Crie sua primeira transação!</p>
        )}

        {error && toast.error(`Erro ao carregar transações: ${error.message}`)}

        {totalPages >= 1 && (
            <AppPaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        )}
    </>
  );
}