import type { TransactionTypeEnum } from "../enums/transactionTypeEnum";

export interface ICategory {
    id: string;
    userId: string;
    name: string;
    type: TransactionTypeEnum;
    description: string;
}

export interface ICreateCategoryRequest {
    name: string;
    type: TransactionTypeEnum;
    description: string;
}