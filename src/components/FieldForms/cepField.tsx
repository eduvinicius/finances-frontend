import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { formatPostalCode } from "@/shared/utils/postalCodeMask";
import { Field, FieldDescription, FieldLabel } from "../ui/Field";
import { Input } from "../ui/Input";

interface CepFieldProps<T extends FieldValues> {
  control: Control<T>;
  error?: string;
  notFound?: boolean;
  isLoading?: boolean;
}

export function CepField<T extends FieldValues>({
  control,
  error,
  notFound = false,
  isLoading = false,
}: Readonly<CepFieldProps<T>>) {
  const descriptionText = error ? error : notFound ? "CEP não encontrado" : "";
  const descriptionClass = error || notFound ? "text-red-500" : "";

  return (
    <Field>
      <FieldLabel htmlFor="postalCode">CEP</FieldLabel>
      <Controller
        name={"postalCode" as Path<T>}
        control={control}
        render={({ field }) => (
          <Input
            id="postalCode"
            type="text"
            placeholder="00000-000"
            aria-invalid={!!error || notFound}
            disabled={isLoading}
            value={field.value || ""}
            onChange={(e) => {
              const formatted = formatPostalCode(e.target.value);
              field.onChange(formatted);
            }}
            onBlur={field.onBlur}
            maxLength={9}
          />
        )}
      />
      <FieldDescription className={descriptionClass}>
        {descriptionText}
      </FieldDescription>
    </Field>
  );
}
