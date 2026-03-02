import { Button } from "@/components/ui/Button"
import { FieldGroup, FieldSet } from "@/components/ui/Field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { IFiltersBaseProps } from "@/shared/types/filtersBase.types"
import type { AccountFiltersValues } from "@/shared/types/account.types"
import { accountFiltersSchema } from "@/shared/schemas/accountFiltersSchema"
import { ACCOUNT_TYPE_OPTIONS } from "@/shared/constants/accountTypeOptions.const"
import { FormField } from "@/components/FieldForms/formField"
import { ComboboxField, DateRangeField } from "@/components/FieldForms"

export function AccountFilters({
  onFilter,
  onClear,
  loading = false,
}: Readonly<IFiltersBaseProps<AccountFiltersValues>>) {

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AccountFiltersValues>({
    resolver: zodResolver(accountFiltersSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      accountType: [],
    },
  })

  const handleClearFilters = () => {
    reset({
      name: "",
      accountType: [],
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
                        id="accountType"
                        label="Tipo de Conta"
                        fieldName="accountType"
                        control={control}
                        options={ACCOUNT_TYPE_OPTIONS ?? []}
                        error={errors.accountType?.message}
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