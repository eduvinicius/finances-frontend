import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import { useGetAllTransactions } from "../hooks/useGetAllTransactions";
import { Spinner } from "@/components/ui/Spinner";
import { TransactionFilters, TransactionsForm, TransactionTableSkeleton } from "../components";
import { AppPaginator } from "@/components/ui/Paginator/appPaginator";
import { AppDialog } from "@/components/AppDialog";
import type { ITransacionColumns, TransactionFiltersValues, TransactionFormValues } from "@/shared/types/transactions.types";
import { AppTable } from "@/components/ui/Table/appTable";
import { TRANSACTIONS_COLUMNS } from "../constants/transactionColumns.const";
import { useGetAllCategories } from "@/features/Categories/hooks/useGetAllCategories";
import { useGetAllAccounts } from "@/features/Account/hooks/useGetAllAccounts";
import { TRANSACTION_TYPE_OPTIONS } from "@/shared/constants/transactionTypeOptions.const";

export function Transactions() {

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TransactionFiltersValues | undefined>(undefined);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { data, isLoading, error } = useGetAllTransactions({ page: currentPage, pageSize }, filters ?? {});
  const { mutate, isPending } = useCreateTransaction();
  const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();
  const { data: accounts, isLoading: accountsLoading } = useGetAllAccounts();

  const totalPages = useMemo(
      () => Math.ceil((data?.totalCount ?? 0) / pageSize),
      [data?.totalCount, pageSize]
  );

  const selectComboboxOptions = useMemo(() => {
    return {
      categoriesOptions: categories?.map(category => ({
        label: category.name,
        value: category.id,
      })) ?? [],

      accountsOptions: accounts?.map(account => ({
        label: account.name,
        value: account.id,
      })) ?? [],

      transactionTypeOptions: TRANSACTION_TYPE_OPTIONS.map(option => ({
        label: option.label,
        value: option.value,
      })) ?? [],
    }
  }, [categories, accounts]);


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
              <TransactionsForm onSubmit={handleFormSubmit} selectOptions={selectComboboxOptions} /> 
            }
            isDialogOpen={isCreateDialogOpen}
            setIsDialogOpen={setIsCreateDialogOpen}
         />
      </header>
      {categoriesLoading && accountsLoading ? 
        <Spinner className="mx-auto my-4 w-10 h-10" /> : (
        <TransactionFilters 
          onFilter={filterTransactions} 
          onClear={handleClearFilters}
          loading={isLoading}
          selectOptions={selectComboboxOptions} />
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