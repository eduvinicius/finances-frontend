import { useState } from "react";
import {
  MonthSelector,
  CategoryReportTab,
  SummaryTab,
} from "../components";
import { AppTabs } from "@/components/ui/Tab";

export function Summary() {

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const selectedYear = now.getFullYear();

  const from = new Date(selectedYear, selectedMonth, 1);
  const to = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59, 999);

  return (
    <div className="px-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Resumo</h1>
        <MonthSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
        />
      </header>

      <AppTabs
        listClassName="border"
        triggerClassName="data-[state=active]:border-b-(--green-100) data-[state=active]:border-b-2 cursor-pointer"
        tabs={[
          {
            value: "summary",
            label: "Resumo",
            content: <SummaryTab from={from} to={to} />,
          },
          {
            value: "category-report",
            label: "Por Categoria",
            content: <CategoryReportTab from={from} to={to} />,
          },
        ]}
      />
    </div>
  );
}
