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
      <p className="text-center text-muted-foreground">
        Nenhum dado disponível para o período selecionado.
      </p>
    );
  }

  const chartData = {
    labels: data.map((item) => item.categoryName),
    values: data.map((item) => item.totalAmount),
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full">
      <p>{title}</p>
      <div>
        <DoughnutChart
          data={chartData}
          formatValue={formatCurrency}
          showLegend={true}
        />
      </div>
    </div>
  );
}
