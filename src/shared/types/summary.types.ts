import type { AccountTypeEnum } from "../enums/accountTypeEnum";

export interface IAccountSummary {
  accountId: string;
  name: string;
  type: AccountTypeEnum;
  balance: number;
}

export interface ISummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  accounts: IAccountSummary[];
}

export interface ISummaryService {
  getSummary: (from: Date, to: Date) => Promise<ISummary>;
}
