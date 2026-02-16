import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { TRANSACTION_TYPE_STRINGS } from "@/shared/constants/transactionTypeOptions.const";
import type { CategoriesListProps } from "@/shared/types/category.type";

export function CategoriesList({ data }: Readonly<CategoriesListProps>) {

    return (
        <div className="grid grid-cols-5 gap-6 m-5">
            {data.map((category) => (
                <Card key={category.id} className="overflow-hidden">
                    <CardHeader>
                        <CardTitle title={category.name} />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <img
                            src="https://placehold.co/100x100"
                            alt={category.name}
                            className="w-full h-40 object-cover rounded-md"
                        />
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