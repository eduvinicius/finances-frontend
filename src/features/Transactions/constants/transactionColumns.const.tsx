import { format } from "date-fns";
import { TRANSACTION_TYPE_STRINGS } from "@/shared/constants/transactionTypeOptions.const";
import type { ITransaction } from "@/shared/types/transactions.types";
import { HiddenAmount, TransactionDetailsCell } from "../components";
import type { Column } from "@/components/ui/Table/appTable";

export const TRANSACTIONS_COLUMNS: Column<ITransaction>[] = [
  { header: "Conta", accessor: (row: ITransaction) => row.account?.name ?? "Sem conta" },
  { header: "Tipo de Transação", accessor: (row: ITransaction) => TRANSACTION_TYPE_STRINGS[row.type] ?? "--" },
  { header: "Descrição", accessor: "description" },
  {
    header: "Valor",
    accessor: (row: ITransaction) => row.amount,
    cell: (_value: unknown, row: ITransaction) => <HiddenAmount amount={row.amount} />,
  },
  { header: "Data", accessor: (row: ITransaction) => format(new Date(row.createdAt), 'dd/MM/yyyy') },
  { header: "Categoria", accessor: (row: ITransaction) => row.category?.name ?? "Sem categoria" },
  {
    header: "Detalhes",
    accessor: (row: ITransaction) => row.id,
    cell: (_value: unknown, row: ITransaction) => <TransactionDetailsCell transaction={row} />,
  },
];
