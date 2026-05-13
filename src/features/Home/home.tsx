import { useEffect } from "react";
import { toast } from "sonner";
import { useGetHomeDashboard } from "./hooks/useGetHomeDashboard";
import { BalanceCard } from "./components/BalanceCard";
import { MonthSummaryCard } from "./components/MonthSummaryCard";
import { RecentTransactionsCard } from "./components/RecentTransactionsCard";
import { WeeklySpendingCard } from "./components/WeeklySpendingCard";
import { TodaySpendingCard } from "./components/TodaySpendingCard";
import { HomeSkeleton } from "./components/HomeSkeleton";

export function Home() {
  const { data, isLoading, isError, error } = useGetHomeDashboard();

  useEffect(() => {
    if (error) {
      toast.error(`Erro ao carregar o painel: ${error.message}`);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="container px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">Painel</h1>
        <HomeSkeleton />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
        <p className="text-lg font-semibold">Não foi possível carregar o painel.</p>
        <p className="text-sm text-muted-foreground">
          Verifique sua conexão e tente novamente.
        </p>
      </div>
    );
  }

  return (
    <div className="container animate-in fade-in-0 slide-in-from-bottom-2 duration-300 px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Painel</h1>

      <div className="flex flex-col gap-4">
        {/* Balance — full width */}
        <BalanceCard totalBalance={data.totalBalance} />

        {/* Row 1: Month summary + Weekly spending */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <MonthSummaryCard monthSummary={data.monthSummary} />
          <WeeklySpendingCard weeklySpending={data.weeklySpending} />
        </div>

        {/* Row 2: Recent transactions + Today spending */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RecentTransactionsCard transactions={data.recentTransactions} />
          <TodaySpendingCard todaySpending={data.todaySpending} />
        </div>
      </div>
    </div>
  );
}
