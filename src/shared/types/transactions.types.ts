import type z from "zod";
import type { TransactionTypeEnum } from "../enums/transactionTypeEnum";
import type { transactionFormSchema, transactionsFiltersSchema } from "../schemas/transactionsSchema";
import type { IAccount } from "./account.types";
import type { ICategory } from "./category.type";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "./pagination.types";
import type { ISelectBaseProps } from "./selectBase.types";

export type TransactionFiltersValues = z.infer<typeof transactionsFiltersSchema>;
export type TransactionFormValues = z.infer<typeof transactionFormSchema>;

export interface ITransactionFilterDto extends TransactionFiltersValues, IPaginatedRequest {}

export interface ITransactionService {
    getTransactions: (pagination: IPaginatedRequest, filters?: TransactionFiltersValues) => Promise<IPaginatedBaseResponse<ITransaction[]>>;
    getTransactionById: (id: string) => Promise<ITransaction>;
    createTransaction: (data: TransactionFormValues) => Promise<ITransaction>;
}
export interface ITransaction {
    id: string;
    accountId: string;
    account: IAccount;
    categoryId: string;
    category: ICategory;
    amount: number;
    type: TransactionTypeEnum;
    description: string;
    createdAt: Date;
}

export interface ITransacionColumns extends ITransaction {
    [key: string]: unknown
}

export interface ITransactionComboboxProps {
    accountsOptions: ISelectBaseProps<string>[];
    categoriesOptions: ISelectBaseProps<string>[];
    transactionTypeOptions: ISelectBaseProps<TransactionTypeEnum>[];
}