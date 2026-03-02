import { useState } from "react";
import { toast } from "sonner";
import { useGetSummary } from "../hooks/useGetSummary";
import { MonthSelector, SummaryCards, SummaryAccountsList, SummarySkeleton } from "../components";

export function Summary() {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const selectedYear = now.getFullYear();

  const from = new Date(selectedYear, selectedMonth, 1);
  const to = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59, 999);

  const { data, isLoading, error } = useGetSummary(from, to);

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resumo</h1>
        <MonthSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
        />
      </header>

      {isLoading ? (
        <SummarySkeleton />
      ) : (
        <div className="flex flex-col gap-6">
          {data && <SummaryCards data={data} />}
          {data && <SummaryAccountsList accounts={data.accounts} />}
        </div>
      )}

      {error && toast.error(`Erro ao carregar resumo: ${error.message}`)}
    </>
  );
}
