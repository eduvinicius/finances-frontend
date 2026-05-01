import { useState } from "react";
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

export function ExportTransactionsModal({
  isOpen,
  onClose,
  currentFilters,
  selectOptions,
}: Readonly<ExportTransactionsModalProps>) {
  const [scope, setScope] = useState<ExportScope>("current");

  const [startDate, setStartDate] = useState<string>(
    toDateInputValue(currentFilters?.fromDate)
  );
  const [endDate, setEndDate] = useState<string>(
    toDateInputValue(currentFilters?.toDate)
  );
  const [categoryId, setCategoryId] = useState<string>(
    currentFilters?.categoryIds?.[0] ?? ALL_SENTINEL
  );
  const [accountId, setAccountId] = useState<string>(
    currentFilters?.accountIds?.[0] ?? ALL_SENTINEL
  );
  const [transactionType, setTransactionType] = useState<string>(
    currentFilters?.type?.[0] == null ? ALL_SENTINEL : String(currentFilters.type[0])
  );

  const { mutate, isPending } = useExportTransactions(onClose);

  const isDisabled = scope === "all";

  const handleSubmit = () => {
    if (scope === "all") {
      const payload: TransactionExportRequest = { exportAll: true };
      mutate(payload);
      return;
    }

    const payload: TransactionExportRequest = {
      exportAll: false,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      categoryId: categoryId === ALL_SENTINEL ? undefined : categoryId,
      accountId: accountId === ALL_SENTINEL ? undefined : accountId,
      type: transactionType === ALL_SENTINEL ? undefined : (Number(transactionType) as TransactionTypeEnum),
    };
    mutate(payload);
  };

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
              checked={scope === "current"}
              onChange={() => setScope("current")}
              className="accent-primary"
            />
            <span className="text-sm">Filtros atuais</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="exportScope"
              value="all"
              checked={scope === "all"}
              onChange={() => setScope("all")}
              className="accent-primary"
            />
            <span className="text-sm">Todas as transações</span>
          </label>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity ${isDisabled ? "opacity-40 pointer-events-none select-none" : ""}`}>
          <Field>
            <FieldLabel htmlFor="export-start-date">Data Inicial</FieldLabel>
            <Input
              id="export-start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={isDisabled}
            />
            <FieldDescription>{""}</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="export-end-date">Data Final</FieldLabel>
            <Input
              id="export-end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={isDisabled}
            />
            <FieldDescription>{""}</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="export-category">Categoria</FieldLabel>
            <Select
              value={categoryId}
              onValueChange={setCategoryId}
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
            <FieldDescription>{""}</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="export-account">Conta</FieldLabel>
            <Select
              value={accountId}
              onValueChange={setAccountId}
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
            <FieldDescription>{""}</FieldDescription>
          </Field>

          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="export-type">Tipo de Transação</FieldLabel>
            <Select
              value={transactionType}
              onValueChange={setTransactionType}
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
            <FieldDescription>{""}</FieldDescription>
          </Field>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
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
