import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutChartData {
  labels: string[];
  values: number[];
  backgroundColor?: string[];
  borderColor?: string[];
}

interface DoughnutChartProps {
  data: DoughnutChartData;
  title?: string;
  showLegend?: boolean;
  cutout?: string;
  formatValue?: (value: number) => string;
}

const DEFAULT_COLORS = [
  "#50B2C0", // Green-100
  "#8381D9", // Purple-100
  "#255D6A", // Green-200
  "#2A2879", // Purple-200
  "#D1D6E4", // Gray-300
  "#8D95AF", // Gray-400
  "#0A313C", // Green-300
  "#303F73", // Gray-500
];

const DEFAULT_BORDER_COLORS = [
  "#50B2C0",
  "#8381D9",
  "#255D6A",
  "#2A2879",
  "#D1D6E4",
  "#8D95AF",
  "#0A313C",
  "#303F73",
];

export function DoughnutChart({
  data,
  title,
  showLegend = true,
  cutout = "60%",
  formatValue = (value: number) => value.toLocaleString("pt-BR"),
}: Readonly<DoughnutChartProps>) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.backgroundColor || DEFAULT_COLORS,
        borderColor: data.borderColor || DEFAULT_BORDER_COLORS,
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: showLegend,
        position: "bottom" as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: "var(--font-family-base)",
          },
          color: "#303F73",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "#181C2A",
        titleColor: "#F8F9FC",
        bodyColor: "#F8F9FC",
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => (a) + (b), 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${formatValue(value)} (${percentage}%)`;
          },
        },
      },
      ...(title && {
        title: {
          display: true,
          text: title,
          font: {
            size: 16,
            weight: "bold",
            family: "var(--font-family-base)",
          },
          color: "#252D4A",
          padding: {
            bottom: 20,
          },
        },
      }),
    },
    cutout,
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
