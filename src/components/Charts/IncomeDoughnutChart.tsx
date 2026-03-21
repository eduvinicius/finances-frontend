import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { ISummary } from "@/shared/types/summary.types";
import { DoughnutChart } from "./DoughnutChart";

interface IncomeDoughnutChartProps {
  data: ISummary;
  title?: string;
}

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function IncomeDoughnutChart({
  data,
  title = "Receitas vs Despesas",
}: Readonly<IncomeDoughnutChartProps>) {
  if (!data || (data.totalIncome === 0 && data.totalExpenses === 0)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle title={title}></CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-center text-muted-foreground">
            Nenhum dado disponível para o período selecionado.
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = {
    labels: ["Receitas", "Despesas"],
    values: [data.totalIncome, data.totalExpenses],
    backgroundColor: ["#50B2C0", "#8381D9"], // Green and Purple
    borderColor: ["#50B2C0", "#8381D9"],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle title={title}></CardTitle>
      </CardHeader>
      <CardContent className="h-80 flex items-center justify-center p-4">
        <DoughnutChart
          data={chartData}
          formatValue={formatCurrency}
          showLegend={true}
        />
      </CardContent>
    </Card>
  );
}
