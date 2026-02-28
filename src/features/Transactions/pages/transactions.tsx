import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/Spinner";
import { AppPaginator } from "@/components/ui/Paginator/appPaginator";
import { AppDialog } from "@/components/AppDialog";
import { AppTable } from "@/components/ui/Table/appTable";
import type { ITransacionColumns, TransactionFiltersValues, TransactionFormValues } from "@/shared/types/transactions.types";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import { useGetAllTransactions } from "../hooks/useGetAllTransactions";
import { useTransactionSelectOptions } from "../hooks/useTransactionSelectOptions";
import { TransactionFilters, TransactionsForm, TransactionTableSkeleton } from "../components";
import { TRANSACTIONS_COLUMNS } from "../constants/transactionColumns.const";

export function Transactions() {

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TransactionFiltersValues | undefined>(undefined);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { data, isLoading, error } = useGetAllTransactions({ page: currentPage, pageSize }, filters ?? {});
  const { mutate, isPending } = useCreateTransaction();
  const { selectOptions, isLoading: selectOptionsLoading } = useTransactionSelectOptions();

  const totalPages = Math.ceil((data?.totalCount ?? 0) / pageSize);

  const handleFormSubmit = (formData: TransactionFormValues) => {
      mutate(formData, {
          onSuccess: () => {
              setIsCreateDialogOpen(false);
          },
      });
  };

  const filterTransactions = (filters: TransactionFiltersValues) => {
      setFilters(filters);
      setCurrentPage(1);
  };

  const handleClearFilters = () => {
      setFilters(undefined);
      setCurrentPage(1);
  };

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">Transações</h1>
         <AppDialog
            buttonText="Nova Transação"
            headerTitle="Criar Nova Transação"
            description="Preencha os campos abaixo para criar uma nova transação."
            dialogType="button"
            component={ isPending ? 
              <Spinner className="mx-auto my-4 w-10 h-10" /> : 
              <TransactionsForm onSubmit={handleFormSubmit} selectOptions={selectOptions} /> 
            }
            isDialogOpen={isCreateDialogOpen}
            setIsDialogOpen={setIsCreateDialogOpen}
         />
      </header>
      {selectOptionsLoading ? 
        <Spinner className="mx-auto my-4 w-10 h-10" /> : (
        <TransactionFilters 
          onFilter={filterTransactions} 
          onClear={handleClearFilters}
          loading={isLoading}
          selectOptions={selectOptions} />
      )}
        {isLoading ? (
          <TransactionTableSkeleton />
        ) : (
          <AppTable<ITransacionColumns>
            data={data?.items as ITransacionColumns[] ?? []}
            columns={TRANSACTIONS_COLUMNS}
            emptyMessage="Nenhuma transação encontrada. Crie sua primeira transação!"
          />
        )}
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