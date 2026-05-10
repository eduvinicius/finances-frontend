import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Field, FieldLabel } from "@/components/ui/Field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/InputSelect";
import { DateRangeField } from "@/components/FieldForms";
import type { AdminUserFilter } from "@/shared/types/adminUser.types";

interface FilterFormValues {
  fullName: string;
  nickname: string;
  documentNumber: string;
  role: string;
  createdAtFrom: Date | undefined;
  createdAtTo: Date | undefined;
}

interface AdminUsersFiltersProps {
  onFilter: (filters: Partial<AdminUserFilter>) => void;
  onClear: () => void;
  loading?: boolean;
}

const ROLE_OPTIONS = [
  { label: "Todas as funções", value: "all" },
  { label: "Admin", value: "1" },
  { label: "Usuário", value: "0" },
];

const DEBOUNCE_MS = 300;

const DEFAULT_VALUES: FilterFormValues = {
  fullName: "",
  nickname: "",
  documentNumber: "",
  role: "all",
  createdAtFrom: undefined,
  createdAtTo: undefined,
};

export function AdminUsersFilters({
  onFilter,
  onClear,
  loading = false,
}: Readonly<AdminUsersFiltersProps>) {
  const { register, control, watch, reset } = useForm<FilterFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const values = watch();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevTextRef = useRef({ fullName: "", nickname: "", documentNumber: "" });
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const { fullName, nickname, documentNumber, role, createdAtFrom, createdAtTo } = values;

    const textChanged =
      fullName !== prevTextRef.current.fullName ||
      nickname !== prevTextRef.current.nickname ||
      documentNumber !== prevTextRef.current.documentNumber;

    const buildFilters = (): Partial<AdminUserFilter> => ({
      ...(fullName ? { fullName } : {}),
      ...(nickname ? { nickname } : {}),
      ...(documentNumber ? { documentNumber } : {}),
      ...(role === "all" ? {} : { role: Number(role) }),
      ...(createdAtFrom ? { createdAtFrom: createdAtFrom.toISOString() } : {}),
      ...(createdAtTo ? { createdAtTo: createdAtTo.toISOString() } : {}),
    });

    if (textChanged) {
      prevTextRef.current = { fullName, nickname, documentNumber };
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
    values.fullName,
    values.nickname,
    values.documentNumber,
    values.role,
    values.createdAtFrom,
    values.createdAtTo,
  ]);

  const handleClear = () => {
    reset(DEFAULT_VALUES);
    prevTextRef.current = { fullName: "", nickname: "", documentNumber: "" };
    onClear();
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full p-4 mt-4 bg-(--green-200) rounded-md shadow-sm border my-6 md:grid-cols-3 lg:grid-cols-4">
      <Field>
        <FieldLabel htmlFor="admin-filter-fullName">Nome completo</FieldLabel>
        <Input
          id="admin-filter-fullName"
          placeholder="Buscar por nome"
          disabled={loading}
          {...register("fullName")}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="admin-filter-nickname">Apelido</FieldLabel>
        <Input
          id="admin-filter-nickname"
          placeholder="Buscar por apelido"
          disabled={loading}
          {...register("nickname")}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="admin-filter-documentNumber">CPF/Documento</FieldLabel>
        <Input
          id="admin-filter-documentNumber"
          placeholder="Buscar por documento"
          disabled={loading}
          {...register("documentNumber")}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="admin-filter-role">Função</FieldLabel>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={loading}
            >
              <SelectTrigger id="admin-filter-role">
                <SelectValue placeholder="Todas as funções" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <DateRangeField<FilterFormValues>
        label="Criado em"
        fromFieldName="createdAtFrom"
        toFieldName="createdAtTo"
        control={control}
      />

      <div className="col-span-2 flex items-end justify-end gap-2 md:col-span-3 lg:col-span-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          disabled={loading}
        >
          Limpar filtros
        </Button>
      </div>
    </div>
  );
}
