import { Link } from "react-router-dom";
import { ArrowRight, ReceiptText } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { usePrivacy } from "@/hooks/usePrivacy";
import { formatCurrency } from "../utils/formatCurrency";
import { cn } from "@/lib/utils";
import { TransactionTypeEnum } from "@/shared/enums/transactionTypeEnum";
import type { IHomeDashboardTransaction } from "@/shared/types/home.types";

interface RecentTransactionsCardProps {
  transactions: IHomeDashboardTransaction[];
}

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (dateStart.getTime() === todayStart.getTime()) return "hoje";
  if (dateStart.getTime() === yesterdayStart.getTime()) return "ontem";

  const DAY_ABBR_PT = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  return DAY_ABBR_PT[date.getDay()] ?? "";
}

interface TransactionRowProps {
  transaction: IHomeDashboardTransaction;
  isHidden: boolean;
}

function TransactionRow({ transaction, isHidden }: Readonly<TransactionRowProps>) {
  const isIncome = transaction.type === TransactionTypeEnum.INCOME;
  const displayAmount = isHidden
    ? "R$ ••••"
    : formatCurrency(Math.abs(transaction.amount));

  return (
    <li className="flex items-center justify-between gap-3 py-2">
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={cn(
            "size-2 shrink-0 rounded-full",
            isIncome ? "bg-green-500" : "bg-red-500"
          )}
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{transaction.description}</p>
          {transaction.categoryName && (
            <p className="truncate text-xs text-muted-foreground">{transaction.categoryName}</p>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span
          className={cn(
            "text-sm font-semibold",
            isIncome ? "text-green-600" : "text-red-500"
          )}
        >
          {isIncome ? "+" : "-"}{displayAmount}
        </span>
        <span className="text-xs text-muted-foreground capitalize">
          {formatRelativeDate(transaction.createdAt)}
        </span>
      </div>
    </li>
  );
}

export function RecentTransactionsCard({ transactions }: Readonly<RecentTransactionsCardProps>) {
  const { isHidden } = usePrivacy();
  const recentSlice = transactions.slice(0, 5);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle
          title="Últimas Transações"
          className="text-sm font-medium text-muted-foreground"
        />
      </CardHeader>
      <CardContent className="flex-1">
        {recentSlice.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <ReceiptText className="size-10 text-muted-foreground/40" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">Nenhuma transação recente</p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/transactions">Adicionar primeira transação</Link>
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-border" aria-label="Transações recentes">
            {recentSlice.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                isHidden={isHidden}
              />
            ))}
          </ul>
        )}
      </CardContent>
      {recentSlice.length > 0 && (
        <CardFooter className="border-t pt-4">
          <Button variant="outline" size="sm" className="w-full gap-2" asChild>
            <Link to="/transactions">
              Ver todas as transações
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
