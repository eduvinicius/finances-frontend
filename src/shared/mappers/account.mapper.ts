import type { IAccount } from "@/shared/types/account.types";
import type { ISelectBaseProps } from "@/shared/types/selectBase.types";

export function mapAccountsToSelectOptions(accounts: IAccount[]): ISelectBaseProps<string>[] {
    return accounts.map(account => ({
        label: account.name,
        value: account.id,
    }));
}
