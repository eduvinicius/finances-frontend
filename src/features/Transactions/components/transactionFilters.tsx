import { useEffect, useRef } from "react";
import { ComboboxField, DateRangeField } from "@/components/FieldForms";
import { Button } from "@/components/ui/Button";
import { transactionsFiltersSchema } from "@/shared/schemas/transactionsSchema";
import type { IFiltersBaseProps } from "@/shared/types/filtersBase.types";
import type { ITransactionComboboxProps, TransactionFiltersValues } from "@/shared/types/transactions.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const DEFAULT_VALUES: TransactionFiltersValues = {
  accountIds: [],
  categoryIds: [],
  type: [],
};

export function TransactionFilters({
  onFilter,
  onClear,
  loading = false,
  selectOptions
}: Readonly<IFiltersBaseProps<TransactionFiltersValues, ITransactionComboboxProps>>) {

  const {
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<TransactionFiltersValues>({
    resolver: zodResolver(transactionsFiltersSchema),
    defaultValues: DEFAULT_VALUES,
  })

  const values = watch();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const { accountIds, categoryIds, type, fromDate, toDate } = values;

    const buildFilters = (): Partial<TransactionFiltersValues> => ({
      ...(accountIds?.length ? { accountIds } : {}),
      ...(categoryIds?.length ? { categoryIds } : {}),
      ...(type?.length ? { type } : {}),
      ...(fromDate ? { fromDate } : {}),
      ...(toDate ? { toDate } : {}),
    });

    onFilter(buildFilters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values.accountIds,
    values.categoryIds,
    values.type,
    values.fromDate,
    values.toDate,
  ]);

  const handleClearFilters = () => {
    reset(DEFAULT_VALUES);
    onClear();
  }

  return (
        <form className="grid grid-cols-4 gap-4 w-full p-4 mt-4 bg-(--green-200) rounded-md shadow-sm border my-6">
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
            </div>
        </form>
  )
}