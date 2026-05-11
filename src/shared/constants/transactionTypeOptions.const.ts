import { TransactionTypeEnum, TransactionTypeEnumString } from "../enums/transactionTypeEnum";
import type { ISelectBaseProps } from "../types/selectBase.types";

export const TRANSACTION_TYPE_OPTIONS: ISelectBaseProps<TransactionTypeEnum>[] = [
  { value: TransactionTypeEnum.ALL, label: TransactionTypeEnumString.ALL },
  { value: TransactionTypeEnum.INCOME, label: TransactionTypeEnumString.INCOME },
  { value: TransactionTypeEnum.EXPENSE, label: TransactionTypeEnumString.EXPENSE },
  { value: TransactionTypeEnum.INVESTMENT, label: TransactionTypeEnumString.INVESTMENT },
];

export const TRANSACTION_TYPE_STRINGS: Record<string, string> = {
  All: TransactionTypeEnumString.ALL,
  Income: TransactionTypeEnumString.INCOME,
  Expense: TransactionTypeEnumString.EXPENSE,
  Investment: TransactionTypeEnumString.INVESTMENT,
};