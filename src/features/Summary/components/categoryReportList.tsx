import { Card, CardContent } from "@/components/ui/Card";
import type { ICategoryReport } from "@/shared/types/summary.types";

interface CategoryReportListProps {
  data: ICategoryReport[];
}

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const formatPercentage = (value: number) =>
  value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%";

export function CategoryReportList({ data }: Readonly<CategoryReportListProps>) {
  if (data.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-6">
        Nenhuma categoria encontrada para o período selecionado.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((item) => (
        <Card key={item.categoryId} className="py-4">
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.categoryName}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {formatPercentage(item.percentageOfTotal)}
                </span>
                <span className="text-sm font-semibold">
                  {formatCurrency(item.totalAmount)}
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${Math.min(item.percentageOfTotal, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
