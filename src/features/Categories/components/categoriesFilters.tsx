import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { FieldGroup, FieldSet } from "@/components/ui/Field"
import { categoriesFiltersSchema } from "@/shared/schemas/categoriesFiltersSchema"
import { TRANSACTION_TYPE_OPTIONS } from "@/shared/constants/transactionTypeOptions.const"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { IFiltersBaseProps } from "@/shared/types/filtersBase.types"
import type { CategoriesFiltersValues } from "@/shared/types/category.type"
import { ComboboxField, DateRangeField, FormField } from "@/components/FieldForms"

const DEBOUNCE_MS = 300;

const DEFAULT_VALUES: CategoriesFiltersValues = {
  name: "",
  transactionType: [],
};

export function CategoriesFilters({
  onFilter,
  onClear,
  loading = false,
}: Readonly<IFiltersBaseProps<CategoriesFiltersValues>>) {

  const {
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<CategoriesFiltersValues>({
    resolver: zodResolver(categoriesFiltersSchema),
    defaultValues: DEFAULT_VALUES,
  })

  const values = watch();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevTextRef = useRef({ name: "" });
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const { name, transactionType, fromDate, toDate } = values;

    const textChanged = name !== prevTextRef.current.name;

    const buildFilters = (): Partial<CategoriesFiltersValues> => ({
      ...(name ? { name } : {}),
      ...(transactionType?.length ? { transactionType } : {}),
      ...(fromDate ? { fromDate } : {}),
      ...(toDate ? { toDate } : {}),
    });

    if (textChanged) {
      prevTextRef.current = { name: name ?? "" };
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onFilter(buildFilters());
      }, DEBOUNCE_MS);
    } else {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      onFilter(buildFilters());
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values.name,
    values.transactionType,
    values.fromDate,
    values.toDate,
  ]);

  const handleClearFilters = () => {
    reset(DEFAULT_VALUES);
    prevTextRef.current = { name: "" };
    onClear();
  }

  return (
        <form className="w-full p-4 mt-4 bg-(--green-200) rounded-md shadow-sm border">
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
                </div>
            </FieldSet>
        </form>
  )
}