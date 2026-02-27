import { TRANSACTION_TYPE_STRINGS } from "@/shared/constants/transactionTypeOptions.const";
import type { ITransaction } from "@/shared/types/transactions.types";

interface TransactionDetailsModalProps {
    transaction?: ITransaction;
}

export function TransactionDetailsModal({ transaction }: Readonly<TransactionDetailsModalProps>) {
    if (!transaction) return null;

    return (
        <div className="flex flex-col gap-3 text-sm">
            <DetailRow label="Conta" value={transaction.account?.name ?? "Sem conta"} />
            <DetailRow label="Tipo" value={TRANSACTION_TYPE_STRINGS[transaction.type] ?? "--"} />
            <DetailRow label="Descrição" value={transaction.description} />
            <DetailRow label="Valor" value={`R$ ${transaction.amount.toFixed(2)}`} />
            <DetailRow label="Data" value={new Date(transaction.createdAt).toLocaleDateString()} />
            <DetailRow label="Categoria" value={transaction.category?.name ?? "Sem categoria"} />
        </div>
    );
}

interface DetailRowProps {
    label: string;
    value: string;
}

function DetailRow({ label, value }: Readonly<DetailRowProps>) {
    return (
        <div className="flex justify-between gap-4">
            <span className="text-muted-foreground font-medium">{label}</span>
            <span>{value}</span>
        </div>
    );
}
