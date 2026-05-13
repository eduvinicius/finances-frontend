import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { usePrivacy } from "@/hooks/usePrivacy";
import { formatCurrency } from "../utils/formatCurrency";
import type { ITodaySpending } from "@/shared/types/home.types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TodaySpendingCardProps {
  todaySpending: ITodaySpending;
}

export function TodaySpendingCard({ todaySpending }: Readonly<TodaySpendingCardProps>) {
  const { isHidden } = usePrivacy();

  const todayLabel = format(new Date(), "dd/MM", { locale: ptBR });
  const displayTotal = isHidden ? "R$ ••••" : formatCurrency(todaySpending.total);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle
          title={`Gastos de Hoje — ${todayLabel}`}
          className="text-sm font-medium text-muted-foreground"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <p className="text-2xl font-bold text-red-500">{displayTotal}</p>

        {todaySpending.transactions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <span className="text-3xl" role="img" aria-label="Comemorando">
              🎉
            </span>
            <p className="text-sm text-muted-foreground">Nenhum gasto hoje</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2" aria-label="Gastos de hoje">
            {todaySpending.transactions.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{tx.description}</p>
                  {tx.categoryName && (
                    <p className="truncate text-xs text-muted-foreground">{tx.categoryName}</p>
                  )}
                </div>
                <span className="shrink-0 text-sm font-semibold text-red-500">
                  -{isHidden ? "R$ ••••" : formatCurrency(Math.abs(tx.amount))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
