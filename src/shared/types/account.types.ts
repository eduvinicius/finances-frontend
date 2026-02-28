import type z from "zod";
import type { AccountTypeEnum } from "../enums/accountTypeEnum";
import type { accountSchema } from "../schemas/accountSchema";
import type { accountFiltersSchema } from "../schemas/accountFiltersSchema";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "./pagination.types";

export type AccountFormValues = z.infer<typeof accountSchema>;
export type AccountFiltersValues = z.infer<typeof accountFiltersSchema>;

export interface IAccountService {
    getAccountsPaginated : (pagination: IPaginatedRequest, filters: AccountFiltersValues) => Promise<IPaginatedBaseResponse<IAccount[]>>;
    getAllAccounts: () => Promise<IAccount[]>;
    createAccount: (data: ICreateAccount) => Promise<IAccount>;
}

export interface ICreateAccount {
    name: string;
    type: AccountTypeEnum;
    balance: number;
}

export interface IAccount {
    id: string;
    userId: string;
    name: string;
    type: AccountTypeEnum;
    balance: number;
    isActive: boolean;
    createdAt: string;
}

export interface IAccountFormProps {
    onSubmit: (data: AccountFormValues) => void;
    loading?: boolean;
}

export interface IAccountsListProps {
    data: IAccount[];
}