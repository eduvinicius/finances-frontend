import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { TRANSACTION_TYPE_STRINGS } from "@/shared/constants/transactionTypeOptions.const";
import { TransactionTypeEnum } from "@/shared/enums/transactionTypeEnum";
import type { CategoriesListProps } from "@/shared/types/category.type";
import { FcMoneyTransfer } from "react-icons/fc";
import { TbPigMoney } from "react-icons/tb";
import { GiExpense } from "react-icons/gi";

const ICON_BY_TYPE: Record<TransactionTypeEnum, React.ReactNode> = {
    [TransactionTypeEnum.INCOME]: <FcMoneyTransfer size={48} />,
    [TransactionTypeEnum.EXPENSE]: <GiExpense color="red" size={48} />,
    [TransactionTypeEnum.INVESTMENT]: <TbPigMoney color="green" size={48} />,
};

export function CategoriesList({ data }: Readonly<CategoriesListProps>) {
    return (
        <div className="grid grid-cols-4 gap-6 m-5">
            {data.map((category) => (
                <Card key={category.id} className="overflow-hidden">
                    <CardHeader>
                        <CardTitle title={category.name} />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-center items-center">
                            {ICON_BY_TYPE[category.type]}
                        </div>
                        <CardDescription description={category.description} />
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">Tipo:</span>
                            <span className="text-sm font-semibold">{TRANSACTION_TYPE_STRINGS[category.type]}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}