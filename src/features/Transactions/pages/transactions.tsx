import { Button } from "@/components/ui/Button/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Dialog } from "@/components/ui/Dialog/dialog";
import { DialogTrigger } from "@/components/ui/Dialog/dialogTrigger";
import { Spinner } from "@/components/ui/Spinner";
import type { TransactionFiltersValues, TransactionFormValues } from "@/shared/types/transactions.types";
import { useMemo, useState } from "react";
import { useGetAllTransactions } from "../hooks/useGetAllTransactions";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import { TransactionsForm } from "../components";


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
      mutate(formData, {
          onSuccess: () => {
              setIsDialogOpen(false);
          },
      });
  };

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">Transações</h1>
        <Dialog 
            open={isDialogOpen} 
            onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>Nova Transação</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar Nova Transação</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para criar uma nova transação.
                    </DialogDescription>
                </DialogHeader>
                {isPending ? (
                    <Spinner className="mx-auto my-4 w-10 h-10" />
                ) : (
                    <TransactionsForm />
                    // <TransactionsForm onSubmit={handleFormSubmit} />
                )}
            </DialogContent>
        </Dialog>
      </header>
      <div></div>
    </>
  );
}