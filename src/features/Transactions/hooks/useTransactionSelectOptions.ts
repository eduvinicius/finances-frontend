import { useGetAllCategories } from "@/features/Categories/hooks/useGetAllCategories";
import { useGetAllAccounts } from "@/features/Account/hooks/useGetAllAccounts";
import { mapCategoriesToSelectOptions } from "@/shared/mappers/category.mapper";
import { mapAccountsToSelectOptions } from "@/shared/mappers/account.mapper";
import { TRANSACTION_TYPE_OPTIONS } from "@/shared/constants/transactionTypeOptions.const";
import type { ISelectBaseFromHooksProps } from "@/shared/types/selectBase.types";
import type { TransactionTypeEnum } from "@/shared/enums/transactionTypeEnum";

export function useTransactionSelectOptions(): ISelectBaseFromHooksProps<string, TransactionTypeEnum> {
    const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();
    const { data: accounts, isLoading: accountsLoading } = useGetAllAccounts();

    return {
        selectOptions: {
            categoriesOptions: categories ? mapCategoriesToSelectOptions(categories) : [],
            accountsOptions: accounts ? mapAccountsToSelectOptions(accounts) : [],
            transactionTypeOptions: TRANSACTION_TYPE_OPTIONS,
        },
        isLoading: categoriesLoading || accountsLoading,
    };
}
