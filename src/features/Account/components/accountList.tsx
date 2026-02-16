import { Card, CardContent, CardDescription, CardHeader, CardTitle,  } from "@/components/ui/Card";
import { ACCOUNT_TYPE_STRINGS } from "@/shared/constants/accountTypeOptions.const";
import type { IAccountsListProps } from "@/shared/types/account.types";

export function AccountsList({ data }: Readonly<IAccountsListProps>) {

    return (
        <div className="grid grid-cols-5 gap-6 m-5">
            {data.map((account) => (
                <Card key={account.id} className="overflow-hidden">
                    <CardHeader>
                        <CardTitle title={account.name} />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <img
                            src="https://placehold.co/100x100"
                            alt={account.name}
                            className="w-full h-40 object-cover rounded-md"
                        />
                        <CardDescription description={`Saldo: ${account.balance}`} />
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">Tipo:</span>
                            <span className="text-sm font-semibold">{ACCOUNT_TYPE_STRINGS[account.type]}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}