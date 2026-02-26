import type { FormFieldProps } from "@/shared/types/formBase.types";
import { Controller, type FieldValues, type Path } from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "../ui/Field";
import { Textarea } from "../ui/InputGroup/textarea";

export function TextAreaFormField<T extends FieldValues>({
    id,
    label,
    placeholder,
    error,
    helperText,
    control,
    fieldName
}: Readonly<FormFieldProps<T>>) {
    return (
        <Field>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Controller
                name={fieldName as Path<T>}
                control={control}
                render={({ field }) => (
                    <Textarea
                        id={id}
                        placeholder={placeholder}
                        aria-invalid={!!error}
                        {...field}
                    />
                )}
            />
            <FieldDescription
                className={error ? "text-red-500" : ""}>
                {error || helperText || ""}
            </FieldDescription>
        </Field>
    )
}