import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ACCOUNT_TYPE_STRINGS } from "@/shared/constants/accountTypeOptions.const";
import type { IAccountSummary } from "@/shared/types/summary.types";

interface SummaryAccountsListProps {
  accounts: IAccountSummary[];
}

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function SummaryAccountsList({ accounts }: Readonly<SummaryAccountsListProps>) {
  if (accounts.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-6">
        Nenhuma conta encontrada para o período selecionado.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Contas</h2>
      {accounts.map((account) => (
        <Card key={account.accountId} className="py-4">
          <CardHeader className="pb-0">
            <CardTitle title={account.name} className="text-base" />
          </CardHeader>
          <CardContent className="flex items-center justify-between pt-2">
            <span className="text-sm text-muted-foreground">
              {ACCOUNT_TYPE_STRINGS[account.type]}
            </span>
            <span
              className={`text-base font-semibold ${
                account.balance >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {formatCurrency(account.balance)}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
