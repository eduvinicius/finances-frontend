import type { AccountTypeEnum } from "../enums/accountTypeEnum";
import type { TransactionTypeEnum } from "../enums/transactionTypeEnum";

export interface ICategoryReport {
  categoryId: string;
  categoryName: string;
  type: TransactionTypeEnum;
  totalAmount: number;
  percentageOfTotal: number;
}

export interface ICategoryReportService {
  getCategoryReport: (from: Date, to: Date, transactionType: TransactionTypeEnum) => Promise<ICategoryReport[]>;
}

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
