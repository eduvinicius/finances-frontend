import { useState } from "react";
import { useCreateAccount } from "../hooks/useCreateAccount";
import { useGetAccounts } from "../hooks/useGetAccounts";
import type { AccountFormValues } from "@/shared/types/account.types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { AccountForm } from "@/shared/forms/accountForm";
import { AccountsList, AccountsListSkeleton } from "../components";
import { toast } from "sonner";

export function Account() {

    const { data, isLoading, error } = useGetAccounts();
    const { mutate, isPending } = useCreateAccount();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const handleFormSubmit = (formData: AccountFormValues) => {
      mutate(formData, {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
      });
    };

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
        {isLoading ? <AccountsListSkeleton /> : <AccountsList data={data ?? []} />}
        {data?.length === 0 && !isLoading && (
          <p className="text-center text-muted-foreground mt-10">Nenhuma conta encontrada. Crie sua primeira conta!</p>
        )}
        {error && toast.error(`Erro ao carregar contas: ${error.message}`)}
      </>
    );
}