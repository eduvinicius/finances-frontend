import { ACCOUNT_TYPE_STRINGS } from "@/shared/constants/accountTypeOptions.const";
import { TRANSACTION_TYPE_STRINGS } from "@/shared/constants/transactionTypeOptions.const";
import type { ITransaction } from "@/shared/types/transactions.types";
import { usePrivacy } from "@/hooks/usePrivacy";

interface TransactionDetailsModalProps {
    transaction?: ITransaction;
}

export function TransactionDetailsModal({ transaction }: Readonly<TransactionDetailsModalProps>) {
  const { isHidden } = usePrivacy();
  if (!transaction) return null;

  const masked = "••••";
  const balance = isHidden ? masked : `R$ ${transaction.account?.balance.toFixed(2) ?? "0.00"}`;
  const amount = isHidden ? masked : `R$ ${transaction.amount.toFixed(2)}`;

  return (
        <div className="flex flex-col gap-3 text-sm">
            <DetailRow label="Conta" value={transaction.account?.name ?? "Sem conta"} />
            <DetailRow label="Saldo da conta" value={balance} />
            <DetailRow label="Tipo de conta" value={ACCOUNT_TYPE_STRINGS[transaction.account?.type] ?? "--"} />
            <DetailRow label="Tipo de transação" value={TRANSACTION_TYPE_STRINGS[transaction.type] ?? "--"} />
            <DetailRow label="Descrição" value={transaction.description} />
            <DetailRow label="Valor" value={amount} />
            <DetailRow label="Data" value={new Date(transaction.createdAt).toLocaleDateString()} />
            <DetailRow label="Categoria" value={transaction.category?.name ?? "Sem categoria"} />
            <DetailRow label="Desc. da Categoria" value={transaction.category?.description ?? "Sem descrição"} />
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
