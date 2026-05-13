import type { TransactionTypeEnum } from "../enums/transactionTypeEnum";

export interface IHomeDashboardTransaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionTypeEnum;
  categoryName: string | null;
  accountName: string;
  createdAt: string;
}

export interface IMonthSummary {
  totalSpent: number;
  totalIncome: number;
  month: number;
  year: number;
}

export interface IWeeklySpendingDay {
  date: string;
  dayOfWeek: number; // 1=Mon, 7=Sun
  total: number;
}

export interface ITodaySpending {
  total: number;
  transactions: IHomeDashboardTransaction[];
}

export interface IHomeDashboard {
  totalBalance: number;
  monthSummary: IMonthSummary;
  recentTransactions: IHomeDashboardTransaction[];
  weeklySpending: IWeeklySpendingDay[];
  todaySpending: ITodaySpending;
}
