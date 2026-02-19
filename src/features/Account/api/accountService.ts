import { httpClient } from "@/shared/api/httpClient";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { AccountFiltersValues, IAccount, ICreateAccount } from "@/shared/types/account.types";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "@/shared/types/pagination.types";
import type { AxiosResponse } from "axios";

const queryKey = QUERY_KEYS.accounts.toString();

export const accountService = {

    async getAccountsPaginated(
        pagination: IPaginatedRequest,
        filters?: AccountFiltersValues
    ): Promise<IPaginatedBaseResponse<IAccount[]>> {

        const params: Record<string, string | number> = {};
        params.page = pagination.page.toString();
        params.pageSize = pagination.pageSize.toString();
        
        if (filters?.name) params.name = filters.name;
        
        if (filters?.accountType && filters.accountType.length > 0) {
            params.type = filters.accountType.join(',');
        }
        
        if (filters?.fromDate) params.fromDate = filters.fromDate.toISOString();
        
        if (filters?.toDate) params.toDate = filters.toDate.toISOString();
        
        const response: AxiosResponse<IPaginatedBaseResponse<IAccount[]>> = await httpClient.get(`/${queryKey}/paginated`, {
            params
        });
        
        return response.data;
    },

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