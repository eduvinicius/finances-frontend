import { ComboboxField, DateRangeField } from "@/components/FieldForms";
import { Button } from "@/components/ui/Button";
import { transactionsFiltersSchema } from "@/shared/schemas/transactionsSchema";
import type { IFiltersBaseProps } from "@/shared/types/filtersBase.types";
import type { ITransactionComboboxProps, TransactionFiltersValues } from "@/shared/types/transactions.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function TransactionFilters({
    onFilter,
    onClear,
    loading = false,
    selectOptions
}: Readonly<IFiltersBaseProps<TransactionFiltersValues, ITransactionComboboxProps> >) {

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<TransactionFiltersValues>({
        resolver: zodResolver(transactionsFiltersSchema),
        mode: "onTouched",
        defaultValues: {
            accountIds: [],
            categoryIds: [],
            type: [],
        },
    })

    const handleClearFilters = () => {
        reset({
            accountIds: [],
            categoryIds: [],
            type: [],
        })
        
        if (onClear) {
            onClear()
        }
    }

    return (
        <form onSubmit={handleSubmit(onFilter)} className="grid grid-cols-4 gap-4 w-full p-4 mt-4 bg-(--green-200) rounded-md shadow-sm border my-6">
            <ComboboxField
                id="accountId"
                control={control}
                fieldName="accountIds"
                label="Contas"
                options={selectOptions?.accountsOptions ?? []}
                emptyMessage="Nenhuma conta encontrada"
            />

            <ComboboxField
                id="categoryId"
                control={control}
                fieldName="categoryIds"
                label="Categorias"
                options={selectOptions?.categoriesOptions ?? []}
                emptyMessage="Nenhuma categoria encontrada"
            />

            <ComboboxField
                id="type"
                control={control}
                fieldName="type"
                label="Tipo de Transação"
                options={selectOptions?.transactionTypeOptions ?? []}
                emptyMessage="Nenhum tipo de transação encontrado"
            />

            <DateRangeField
                fromFieldName="fromDate"
                toFieldName="toDate"
                control={control}
                error={errors.fromDate?.message || errors.toDate?.message}
            />

            <div className="col-span-4 flex gap-2 justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleClearFilters}
                    disabled={loading}
                >
                    Limpar Filtros
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Filtrando..." : "Filtrar"}
                </Button>
            </div>
        </form>
    )
}