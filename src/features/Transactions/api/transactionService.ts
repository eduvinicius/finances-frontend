import { httpClient } from "@/shared/api/httpClient";
import { getApiEndpoint, QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { IPaginatedBaseResponse, IPaginatedRequest } from "@/shared/types/pagination.types";
import type { ITransaction, ITransactionFilterDto, ITransactionService, TransactionFiltersValues, TransactionFormValues } from "@/shared/types/transactions.types";
import type { AxiosResponse } from "axios";

const transactionApiEndpoint = getApiEndpoint(QUERY_KEYS.transactions.path);
const transactionGetAllEndpoint = getApiEndpoint(QUERY_KEYS.transactions.getAll());
const transactionGetByIdEndpoint = (id: string) => getApiEndpoint(QUERY_KEYS.transactions.getById(id));

export const transactionService: ITransactionService = {

    async getTransactions(
        pagination: IPaginatedRequest,
        filters: TransactionFiltersValues
    ): Promise<IPaginatedBaseResponse<ITransaction[]>> {

        const payload: ITransactionFilterDto = buildTransactionFilters(pagination, filters);

        const response: AxiosResponse<IPaginatedBaseResponse<ITransaction[]>> = await httpClient.post(`/${transactionGetAllEndpoint}`, payload);

        return response.data;
    },

    async getTransactionById(id: string): Promise<ITransaction> {
        const response: AxiosResponse<ITransaction> = await httpClient.get(`/${transactionGetByIdEndpoint(id)}`);
        return response.data;
    },

    async createTransaction(data: TransactionFormValues): Promise<ITransaction> {
        const response: AxiosResponse<ITransaction> = await httpClient.post(`/${transactionApiEndpoint}`, data);
        return response.data;
    }
};

const buildTransactionFilters = (pagination: IPaginatedRequest, filters: TransactionFiltersValues): ITransactionFilterDto => {

    const payload: ITransactionFilterDto = {
        ...filters,
        ...pagination
    };

    if (filters?.accountIds?.length) payload.accountIds = filters.accountIds;

    if (filters?.categoryIds?.length) payload.categoryIds = filters.categoryIds;

    if (filters?.type?.length) payload.type = filters.type;

    if (filters?.fromDate) payload.fromDate = filters.fromDate;
    
    if (filters?.toDate) payload.toDate = filters.toDate;

    return payload;
};