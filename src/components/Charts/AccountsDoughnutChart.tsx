import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { IAccountSummary } from "@/shared/types/summary.types";
import { DoughnutChart } from "./DoughnutChart";

interface AccountsDoughnutChartProps {
  data: IAccountSummary[];
  title?: string;
}

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function AccountsDoughnutChart({
  data,
  title = "Distribuição por Conta",
}: Readonly<AccountsDoughnutChartProps>) {
  // Filter out accounts with zero or negative balance for better visualization
  const filteredData = data.filter((account) => account.balance > 0);

  if (filteredData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle title={title}></CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-center text-muted-foreground">
            Nenhuma conta com saldo positivo disponível.
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = {
    labels: filteredData.map((account) => account.name),
    values: filteredData.map((account) => account.balance),
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
