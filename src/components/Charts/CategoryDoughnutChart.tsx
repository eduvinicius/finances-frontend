import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { ICategoryReport } from "@/shared/types/summary.types";
import { DoughnutChart } from "./DoughnutChart";

interface CategoryDoughnutChartProps {
  data: ICategoryReport[];
  title?: string;
}

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function CategoryDoughnutChart({
  data,
  title = "Distribuição por Categoria",
}: Readonly<CategoryDoughnutChartProps>) {
  if (data.length === 0) {
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
    labels: data.map((item) => item.categoryName),
    values: data.map((item) => item.totalAmount),
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
