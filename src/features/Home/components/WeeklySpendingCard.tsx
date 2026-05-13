import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { usePrivacy } from "@/hooks/usePrivacy";
import { formatCurrency } from "../utils/formatCurrency";
import type { IWeeklySpendingDay } from "@/shared/types/home.types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface WeeklySpendingCardProps {
  weeklySpending: IWeeklySpendingDay[];
}

// dayOfWeek from API: 1=Mon, 7=Sun
const DAY_LABELS_PT = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function getTodayDayOfWeek(): number {
  const jsDay = new Date().getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  // convert to 1=Mon, 7=Sun
  return jsDay === 0 ? 7 : jsDay;
}

export function WeeklySpendingCard({ weeklySpending }: Readonly<WeeklySpendingCardProps>) {
  const { isHidden } = usePrivacy();

  const todayDayOfWeek = getTodayDayOfWeek();
  const weekTotal = weeklySpending.reduce((sum, d) => sum + d.total, 0);

  const maxTotal = Math.max(...weeklySpending.map((d) => d.total), 0.01);

  const backgroundColors = weeklySpending.map((d) =>
    d.dayOfWeek === todayDayOfWeek ? "#50B2C0" : "#8381D9"
  );

  const chartData = {
    labels: weeklySpending.map((d) => DAY_LABELS_PT[(d.dayOfWeek - 1)] ?? ""),
    datasets: [
      {
        data: weeklySpending.map((d) => d.total),
        backgroundColor: backgroundColors,
        borderRadius: 6,
        borderSkipped: false as const,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#181C2A",
        titleColor: "#F8F9FC",
        bodyColor: "#F8F9FC",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => {
            if (isHidden) return "R$ ••••";
            return formatCurrency(ctx.parsed.y ?? 0);
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          font: { size: 11 },
        },
      },
      y: {
        display: false,
        max: maxTotal * 1.25,
      },
    },
  };

  const maxDay = weeklySpending.reduce(
    (best, d) => (d.total > best.total ? d : best),
    weeklySpending[0] ?? { dayOfWeek: 1, total: 0, date: "" }
  );
  const maxDayLabel = DAY_LABELS_PT[(maxDay.dayOfWeek - 1)] ?? "";

  return (
    <Card>
      <CardHeader>
        <CardTitle
          title="Gastos da Semana"
          className="text-sm font-medium text-muted-foreground"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold">
            {isHidden ? "R$ ••••" : formatCurrency(weekTotal)}
          </p>
          <span className="text-xs text-muted-foreground">esta semana</span>
        </div>

        {maxDay.total > 0 && (
          <p className="text-xs text-muted-foreground">
            Maior gasto:{" "}
            <span className="font-medium text-foreground">
              {maxDayLabel} ({isHidden ? "R$ ••••" : formatCurrency(maxDay.total)})
            </span>
          </p>
        )}

        <div className="h-36 w-full" aria-hidden="true">
          <Bar data={chartData} options={options} />
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block size-2.5 rounded-sm bg-[#50B2C0]" />
            Hoje
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2.5 rounded-sm bg-[#8381D9]" />
            Outros dias
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
