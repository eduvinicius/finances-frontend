import type z from "zod";
import type { AccountTypeEnum } from "../enums/accountTypeEnum";
import type { accountSchema } from "../schemas/accountSchema";

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

export type AccountFormValues = z.infer<typeof accountSchema>;

export interface IAccountFormProps {
    onSubmit: (data: AccountFormValues) => void;
    loading?: boolean;
}

export interface IAccountsListProps {
    data: IAccount[];
}