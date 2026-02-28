import { httpClient } from "@/shared/api/httpClient";
import { QUERY_KEYS, getApiEndpoint } from "@/shared/constants/queryKeys";
import type { AccountFiltersValues, IAccount, IAccountService, ICreateAccount } from "@/shared/types/account.types";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "@/shared/types/pagination.types";
import type { AxiosResponse } from "axios";

const baseEndpoint = getApiEndpoint(QUERY_KEYS.accounts.all);
const paginatedEndpoint = getApiEndpoint(QUERY_KEYS.accounts.paginated());

export const accountService: IAccountService = {

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
        
        const response: AxiosResponse<IPaginatedBaseResponse<IAccount[]>> = await httpClient.get(`/${paginatedEndpoint}`, {
            params
        });
        
        return response.data;
    },

    async getAllAccounts(): Promise<IAccount[]> {
        const response: AxiosResponse<IAccount[]> = await httpClient.get(`/${baseEndpoint}`);
        return response.data;
    },

    async createAccount(
        data: ICreateAccount
    ): Promise<IAccount> {
        const response = await httpClient.post<IAccount>(
        `/${baseEndpoint}`,
        data
        );
        return response.data;
    },
}