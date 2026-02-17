import { TransactionTypeEnum, TransactionTypeEnumString } from "../enums/transactionTypeEnum";
import type { ISelectBaseProps } from "../types/selectBase.types";

export const TRANSACTION_TYPE_OPTIONS: ISelectBaseProps<TransactionTypeEnum>[] = [
    { value: TransactionTypeEnum.INCOME, label: TransactionTypeEnumString.INCOME },
    { value: TransactionTypeEnum.EXPENSE, label: TransactionTypeEnumString.EXPENSE },
    { value: TransactionTypeEnum.INVESTMENT, label: TransactionTypeEnumString.INVESTMENT },
];

export const TRANSACTION_TYPE_STRINGS = {
    [TransactionTypeEnum.INCOME]: TransactionTypeEnumString.INCOME,
    [TransactionTypeEnum.EXPENSE]: TransactionTypeEnumString.EXPENSE,
    [TransactionTypeEnum.INVESTMENT]: TransactionTypeEnumString.INVESTMENT,
};