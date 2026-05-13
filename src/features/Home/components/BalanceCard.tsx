import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { usePrivacy } from "@/hooks/usePrivacy";
import { formatCurrency } from "../utils/formatCurrency";

interface BalanceCardProps {
  totalBalance: number;
}

export function BalanceCard({ totalBalance }: Readonly<BalanceCardProps>) {
  const { isHidden } = usePrivacy();

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle
          title="Saldo Geral"
          className="text-sm font-medium text-muted-foreground"
        />
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold tracking-tight">
          {isHidden ? (
            <span aria-hidden="true">R$ ••••</span>
          ) : (
            formatCurrency(totalBalance)
          )}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Saldo consolidado de todas as contas</p>
      </CardContent>
    </Card>
  );
}
