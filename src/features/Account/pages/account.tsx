import { useMemo, useState } from "react";
import { useCreateAccount } from "../hooks/useCreateAccount";
import { useGetAccounts } from "../hooks/useGetAccounts";
import type { AccountFiltersValues, AccountFormValues } from "@/shared/types/account.types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { AccountForm, AccountFilters, AccountsList, AccountsListSkeleton } from "../components";
import { toast } from "sonner";
import { AppPaginator } from "@/components/ui/Paginator/appPaginator";

export function Account() {

    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<AccountFiltersValues | undefined>(undefined);
    const { data, isLoading, error } = useGetAccounts({ page: currentPage, pageSize }, filters);
    const { mutate, isPending } = useCreateAccount();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const totalPages = useMemo(
        () => Math.ceil((data?.totalCount ?? 0) / pageSize),
        [data?.totalCount, pageSize]
    );
    
    const handleFormSubmit = (formData: AccountFormValues) => {
      mutate(formData, {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
      });
    };

    
    const filterAccounts = (filters: AccountFiltersValues) => {
        setFilters(filters);
        setCurrentPage(1);
    }

    const handleClearFilters = () => {
        setFilters(undefined);
        setCurrentPage(1);
    }

    return (
      <>
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-center">Contas</h1>
          <Dialog 
              open={isDialogOpen} 
              onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                  <Button>Nova Conta</Button>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar Nova Conta</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para criar uma nova conta.
                    </DialogDescription>
                  </DialogHeader>
                  {isPending ? (
                    <Spinner className="mx-auto my-4 w-10 h-10" />
                  ) : (
                    <AccountForm onSubmit={handleFormSubmit} />
                  )}
              </DialogContent>
          </Dialog>
        </header>
        <AccountFilters
            onFilter={filterAccounts} 
            onClear={handleClearFilters}
            loading={isLoading}
        />
        {isLoading ? <AccountsListSkeleton /> : <AccountsList data={data?.items ?? []} />}
        {data?.items.length === 0 && !isLoading && (
          <p className="text-center text-muted-foreground mt-10">Nenhuma conta encontrada. Crie sua primeira conta!</p>
        )}
        {error && toast.error(`Erro ao carregar contas: ${error.message}`)}
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