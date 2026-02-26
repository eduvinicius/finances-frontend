import { TRANSACTION_TYPE_STRINGS } from "@/shared/constants/transactionTypeOptions.const";
import type { ITransaction } from "@/shared/types/transactions.types";

export const TRANSACTIONS_COLUMNS = [
  { header: "Conta", accessor: (row: ITransaction) => row.account?.name ?? "Sem conta" },
  { header: "Tipo de Transação", accessor: (row: ITransaction) => TRANSACTION_TYPE_STRINGS[row.type] ?? "--" },
  { header: "Descrição", accessor: "description" },
  { header: "Valor", accessor: (row: ITransaction) => `R$ ${row.amount.toFixed(2)}` },
  { header: "Data", accessor: (row: ITransaction) => new Date(row.createdAt).toLocaleDateString() },
  { header: "Categoria", accessor: (row: ITransaction) => row.category?.name ?? "Sem categoria" },
];
