import { Button } from "@/components/ui/Button"
import { FieldGroup, FieldSet } from "@/components/ui/Field"
import { categoriesFiltersSchema } from "@/shared/schemas/categoriesFiltersSchema"
import { TRANSACTION_TYPE_OPTIONS } from "@/shared/constants/transactionTypeOptions.const"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { IFiltersBaseProps } from "@/shared/types/filtersBase.types"
import type { CategoriesFiltersValues } from "@/shared/types/category.type"
import { ComboboxField, DateRangeField, FormField } from "@/components/FieldForms"

export function CategoriesFilters({
    onFilter,
    onClear,
    loading = false,
}: Readonly<IFiltersBaseProps<CategoriesFiltersValues>>) {

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<CategoriesFiltersValues>({
        resolver: zodResolver(categoriesFiltersSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            transactionType: [],
        },
    })

    const handleClearFilters = () => {
        reset({
            name: "",
            transactionType: [],
        })
        
        if (onClear) {
            onClear()
        }
    }

    return (
        <form onSubmit={handleSubmit(onFilter)} className="w-full p-4 mt-4 bg-(--green-200) rounded-md shadow-sm border">
            <FieldSet className="space-y-4">
                <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                     <FormField
                         id="name"
                         label="Nome"
                         type="text"
                         placeholder="Buscar por nome..."
                         error={errors.name?.message}
                         control={control}
                         fieldName="name"
                     />
 
                     <ComboboxField
                         id="transactionType"
                         label="Tipo de Transação"
                         fieldName="transactionType"
                         control={control}
                         options={TRANSACTION_TYPE_OPTIONS ?? []}
                         error={errors.transactionType?.message}
                     />
 
                     <DateRangeField
                         fromFieldName="fromDate"
                         toFieldName="toDate"
                         control={control}
                         error={errors.fromDate?.message || errors.toDate?.message}
                     />
                </FieldGroup>

                <div className="flex gap-2 justify-end">
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
            </FieldSet>
        </form>
    )
}