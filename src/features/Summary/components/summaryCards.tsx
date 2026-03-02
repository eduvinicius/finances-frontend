import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { ISummary } from "@/shared/types/summary.types";

interface SummaryCardsProps {
  data: ISummary;
}

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function SummaryCards({ data }: Readonly<SummaryCardsProps>) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle title="Saldo Total" className="text-sm text-muted-foreground font-medium" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(data.totalBalance)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle title="Receitas" className="text-sm text-muted-foreground font-medium" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(data.totalIncome)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle title="Despesas" className="text-sm text-muted-foreground font-medium" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-500">{formatCurrency(data.totalExpenses)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
