import { useEffect } from "react";
import { toast } from "sonner";
import { useGetSummary } from "../hooks/useGetSummary";
import { AccountsDoughnutChart } from "@/components/Charts";
import { SummaryCards } from "./summaryCards";
import { SummarySkeleton } from "./summarySkeleton";
import type { IFromToProps } from "@/shared/types/date.types";

export function SummaryTab({ from, to }: Readonly<IFromToProps>) {

  const { data, isLoading, error } = useGetSummary(from, to);

  useEffect(() => {
    if (error) toast.error(`Erro ao carregar resumo: ${error.message}`);
  }, [error]);

  const summaryContent = isLoading ? (
          <SummarySkeleton />
  ) : (
        <div className="flex flex-col gap-6">
          {data && <SummaryCards data={data} />}
          {data && <AccountsDoughnutChart data={data.accounts} />}
        </div>
  );
  return (
    <div>
        {summaryContent}
    </div>
  );
}