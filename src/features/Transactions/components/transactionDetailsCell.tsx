import { AppDialog } from "@/components/AppDialog";
import type { ITransaction } from "@/shared/types/transactions.types";
import { useState } from "react";
import { TransactionDetailsModal } from "./transactionDetailsModal";

export function TransactionDetailsCell({ transaction }: Readonly<{ transaction: ITransaction }>) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <AppDialog
            dialogType="icon"
            headerTitle="Detalhes da Transação"
            description="Visualize os detalhes da transação selecionada."
            component={<TransactionDetailsModal transaction={transaction} />}
            isDialogOpen={isOpen}
            setIsDialogOpen={setIsOpen}
        />
    );
}