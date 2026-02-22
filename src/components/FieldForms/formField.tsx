import { Controller } from "react-hook-form";
import type { UserFormValues } from "@/shared/types/user.types";
import type { FormFieldProps } from "@/shared/types/formBase.types";
import { Field, FieldDescription, FieldLabel } from "../ui/Field";
import { Input } from "../ui/Input";

export function FormField({ 
    id, 
    label, 
    type, 
    placeholder, 
    error, 
    helperText, 
    control,
    fieldName 
}: Readonly<FormFieldProps<UserFormValues>>) {
    return (
        <Field>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Controller 
                name={fieldName}
                control={control}
                render={({ field }) => (
                    <Input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        aria-invalid={!!error}
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                    />
                )}
            />
            <FieldDescription className={error ? "text-red-500" : ""}>
                {error || helperText || ""}
            </FieldDescription>
        </Field>
    );
}