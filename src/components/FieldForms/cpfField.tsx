import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { unformatCPF } from "@/shared/utils/cpfValidation";
import { Field, FieldDescription, FieldLabel } from "../ui/Field";
import { Input } from "../ui/Input";

export function CPFField<T extends FieldValues>({
  control,
  error
}: Readonly<{
    control: Control<T>;
    error?: string;
}>) {
  return (
        <Field>
            <FieldLabel htmlFor="documentNumber">CPF</FieldLabel>
            <Controller
                name={"documentNumber" as Path<T>}
                control={control}
                render={({ field }) => (
                    <Input
                        id="documentNumber"
                        type="text"
                        placeholder="000.000.000-00"
                        aria-invalid={!!error}
                        value={field.value || ""}
                        onChange={(e) => {
                          const unformatted = unformatCPF(e.target.value);
                          field.onChange(unformatted);
                        }}
                        onBlur={field.onBlur}
                        maxLength={14}
                    />
                )}
            />
            <FieldDescription className={error ? "text-red-500" : ""}>
                {error || ""}
            </FieldDescription>
        </Field>
  );
}