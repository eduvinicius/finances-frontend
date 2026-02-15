import { TransactionTypeEnum } from "../enums/transactionTypeEnum";

export const transactionTypeOptions = [
    { value: TransactionTypeEnum.INCOME, label: "Receita" },
    { value: TransactionTypeEnum.EXPENSE, label: "Despesa" },
    { value: TransactionTypeEnum.INVESTMENT, label: "Investimento" },
];