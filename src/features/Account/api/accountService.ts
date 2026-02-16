import { httpClient } from "@/shared/api/httpClient";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { IAccount, ICreateAccount } from "@/shared/types/account.types";
import type { AxiosResponse } from "axios";

const queryKey = QUERY_KEYS.accounts.toString();

export const accountService = {
    async getAllAccounts(): Promise<IAccount[]> {
        const response: AxiosResponse<IAccount[]> = await httpClient.get(`/${queryKey}`);
        return response.data;
    },

    async createAccount(
        data: ICreateAccount
    ): Promise<IAccount> {
        const response = await httpClient.post<IAccount>(
        `/${queryKey}`,
        data
        );
        return response.data;
    },
}