import { Controller, type FieldValues, type Path } from "react-hook-form";
import type { FormFieldProps } from "@/shared/types/formBase.types";
import { Field, FieldDescription, FieldLabel } from "../ui/Field";
import { Input } from "../ui/Input";

export function FormField <T extends FieldValues>({ 
    id, 
    label, 
    type, 
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
                    <Input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        aria-invalid={!!error}
                        value={field.value ?? ""}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (type === "number") {
                                field.onChange(value === "" ? "" : Number(value));
                                return
                            } 
                            field.onChange(value);
                        }}
                    />
                )}
            />
            <FieldDescription className={error ? "text-red-500" : ""}>
                {error || helperText || ""}
            </FieldDescription>
        </Field>
    );
}