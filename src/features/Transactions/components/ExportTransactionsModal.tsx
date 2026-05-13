import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/Field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/InputSelect";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { TransactionTypeEnum } from "@/shared/enums/transactionTypeEnum";
import { exportTransactionSchema, type ExportTransactionFormValues } from "@/shared/schemas/transactionsSchema";
import type { ITransactionComboboxProps, TransactionExportRequest, TransactionFiltersValues } from "@/shared/types/transactions.types";
import { useExportTransactions } from "../hooks/useExportTransactions";

interface ExportTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters?: TransactionFiltersValues;
  selectOptions: ITransactionComboboxProps;
}

type ExportScope = "current" | "all";

const ALL_SENTINEL = "all";

const EXPORT_TYPE_OPTIONS = [
  { value: ALL_SENTINEL, label: "Todos" },
  { value: String(TransactionTypeEnum.INCOME), label: "Receita" },
  { value: String(TransactionTypeEnum.EXPENSE), label: "Despesa" },
  { value: String(TransactionTypeEnum.INVESTMENT), label: "Investimento" },
];

function toDateInputValue(date: Date | undefined): string {
  if (!date) return "";
  return format(date, "yyyy-MM-dd");
}

function buildDefaultValues(currentFilters?: TransactionFiltersValues): ExportTransactionFormValues {
  return {
    startDate: toDateInputValue(currentFilters?.fromDate),
    endDate: toDateInputValue(currentFilters?.toDate),
    categoryId: currentFilters?.categoryIds?.[0] ?? ALL_SENTINEL,
    accountId: currentFilters?.accountIds?.[0] ?? ALL_SENTINEL,
    transactionType: currentFilters?.type?.[0] == null ? ALL_SENTINEL : String(currentFilters.type[0]),
  };
}

export function ExportTransactionsModal({
  isOpen,
  onClose,
  currentFilters,
  selectOptions,
}: Readonly<ExportTransactionsModalProps>) {
  const { mutate, isPending } = useExportTransactions(onClose);
  const [exportScope, setExportScope] = useState<ExportScope>("current");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExportTransactionFormValues>({
    resolver: zodResolver(exportTransactionSchema),
    defaultValues: buildDefaultValues(currentFilters),
  });

  // Re-sync form and scope with current filters each time the modal opens (finding #15)
  useEffect(() => {
    if (isOpen) {
      reset(buildDefaultValues(currentFilters));
      setExportScope("current");
    }
  }, [isOpen, currentFilters, reset]);

  const isDisabled = exportScope === "all";

  function onSubmit(values: ExportTransactionFormValues) {
    if (exportScope === "all") {
      mutate({ exportAll: true });
      return;
    }

    const payload: TransactionExportRequest = {
      exportAll: false,
      startDate: values.startDate || undefined,
      endDate: values.endDate || undefined,
      categoryId: values.categoryId === ALL_SENTINEL ? undefined : values.categoryId,
      accountId: values.accountId === ALL_SENTINEL ? undefined : values.accountId,
      type: values.transactionType === ALL_SENTINEL
        ? undefined
        : Number(values.transactionType),
    };
    mutate(payload);
  }

  function handleScopeChange(value: ExportScope) {
    setExportScope(value);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exportar Transações</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="exportScope"
              value="current"
              checked={exportScope === "current"}
              onChange={() => handleScopeChange("current")}
              className="accent-primary"
            />
            <span className="text-sm">Filtros atuais</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="exportScope"
              value="all"
              checked={exportScope === "all"}
              onChange={() => handleScopeChange("all")}
              className="accent-primary"
            />
            <span className="text-sm">Todas as transações</span>
          </label>
        </div>

        <form id="export-form" onSubmit={handleSubmit(onSubmit)}>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity ${isDisabled ? "opacity-40 pointer-events-none select-none" : ""}`}>
            <Field>
              <FieldLabel htmlFor="export-start-date">Data Inicial</FieldLabel>
              <Input
                id="export-start-date"
                type="date"
                disabled={isDisabled}
                {...register("startDate")}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">{errors.startDate.message}</p>
              )}
              <FieldDescription>{""}</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="export-end-date">Data Final</FieldLabel>
              <Input
                id="export-end-date"
                type="date"
                disabled={isDisabled}
                {...register("endDate")}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
              <FieldDescription>{""}</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="export-category">Categoria</FieldLabel>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ALL_SENTINEL}
                    onValueChange={field.onChange}
                    disabled={isDisabled}
                  >
                    <SelectTrigger id="export-category">
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ALL_SENTINEL}>Todas as categorias</SelectItem>
                      {selectOptions.categoriesOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldDescription>{""}</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="export-account">Conta</FieldLabel>
              <Controller
                name="accountId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ALL_SENTINEL}
                    onValueChange={field.onChange}
                    disabled={isDisabled}
                  >
                    <SelectTrigger id="export-account">
                      <SelectValue placeholder="Todas as contas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ALL_SENTINEL}>Todas as contas</SelectItem>
                      {selectOptions.accountsOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldDescription>{""}</FieldDescription>
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="export-type">Tipo de Transação</FieldLabel>
              <Controller
                name="transactionType"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ALL_SENTINEL}
                    onValueChange={field.onChange}
                    disabled={isDisabled}
                  >
                    <SelectTrigger id="export-type">
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPORT_TYPE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldDescription>{""}</FieldDescription>
            </Field>
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button type="submit" form="export-form" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <Spinner className="w-4 h-4" />
                Exportando...
              </span>
            ) : (
              "Download Excel"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
