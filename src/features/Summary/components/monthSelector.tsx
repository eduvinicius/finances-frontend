import { AppSelect } from "@/components/ui/InputSelect";

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

interface MonthSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
}

export function MonthSelector({ selectedMonth, selectedYear, onMonthChange }: Readonly<MonthSelectorProps>) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">{selectedYear}</span>
      <AppSelect
        options={MONTHS.map((month, index) => ({ value: index, label: month }))}
        value={selectedMonth}
        onValueChange={onMonthChange}
        className="w-48"
      />
    </div>
  );
}
