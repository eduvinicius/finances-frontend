import { useState, useEffect } from "react";
import { toast } from "sonner";
import { TransactionTypeEnum } from "@/shared/enums/transactionTypeEnum";
import { AppSelect } from "@/components/ui/InputSelect";
import { useGetCategoryReport } from "../hooks/useGetCategoryReport";
import { CategoryDoughnutChart } from "@/components/Charts";
import { CategoryReportSkeleton } from "./categoryReportSkeleton";
import { TRANSACTION_TYPE_OPTIONS } from "@/shared/constants/transactionTypeOptions.const";
import type { IFromToProps } from "@/shared/types/date.types";

export function CategoryReportTab({ from, to }: Readonly<IFromToProps>) {
  const [activeType, setActiveType] = useState<TransactionTypeEnum>(TransactionTypeEnum.ALL);

  const { data, isLoading, error } = useGetCategoryReport(from, to, activeType);

  useEffect(() => {
    if (error) toast.error(`Erro ao carregar relatório por categoria: ${error.message}`);
  }, [error]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <AppSelect
        options={TRANSACTION_TYPE_OPTIONS}
        value={activeType}
        onValueChange={setActiveType}
        className="w-48"
      />

      {isLoading ? (
        <CategoryReportSkeleton />
      ) : (
        <CategoryDoughnutChart data={data ?? []} />
      )}

    </div>
  );
}
