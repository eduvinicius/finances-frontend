import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { usePrivacy } from "@/hooks/usePrivacy";
import { formatCurrency } from "../utils/formatCurrency";
import type { IMonthSummary } from "@/shared/types/home.types";

interface MonthSummaryCardProps {
  monthSummary: IMonthSummary;
}

const MONTH_NAMES_PT = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export function MonthSummaryCard({ monthSummary }: Readonly<MonthSummaryCardProps>) {
  const { isHidden } = usePrivacy();
  const masked = "••••";

  const monthName = MONTH_NAMES_PT[(monthSummary.month - 1)] ?? "";
  const spentRatio =
    monthSummary.totalIncome > 0
      ? Math.min((monthSummary.totalSpent / monthSummary.totalIncome) * 100, 100)
      : 0;

  const displaySpent = isHidden ? `R$ ${masked}` : formatCurrency(monthSummary.totalSpent);
  const displayIncome = isHidden ? `R$ ${masked}` : formatCurrency(monthSummary.totalIncome);

  return (
    <Card>
      <CardHeader>
        <CardTitle
          title={`Resumo do Mês — ${monthName} ${monthSummary.year}`}
          className="text-sm font-medium text-muted-foreground"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 rounded-lg bg-green-500/10 p-3">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="size-3.5 text-green-600" aria-hidden="true" />
              <span className="text-xs font-medium text-green-700 dark:text-green-400">Receitas</span>
            </div>
            <p className="text-lg font-bold text-green-600">{displayIncome}</p>
          </div>

          <div className="flex flex-col gap-1 rounded-lg bg-red-500/10 p-3">
            <div className="flex items-center gap-1.5">
              <TrendingDown className="size-3.5 text-red-600" aria-hidden="true" />
              <span className="text-xs font-medium text-red-700 dark:text-red-400">Despesas</span>
            </div>
            <p className="text-lg font-bold text-red-500">{displaySpent}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Gasto vs. Recebido</span>
            <span>{spentRatio.toFixed(0)}%</span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={spentRatio}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Proporção de gastos sobre receita"
          >
            <div
              className="h-full rounded-full bg-red-500 transition-all"
              style={{ width: `${spentRatio}%` }}
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Você gastou {displaySpent} e recebeu {displayIncome} em {monthName}
        </p>
      </CardContent>
    </Card>
  );
}
