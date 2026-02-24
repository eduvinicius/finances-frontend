import { Controller, type FieldValues, type Path } from "react-hook-form";
import type { FormFieldProps } from "@/shared/types/formBase.types";
import { Field, FieldDescription, FieldLabel } from "../ui/Field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/InputSelect";

interface SelectOption<T> {
    label: string;
    value: T;
}

interface SelectFormFieldProps<T extends FieldValues> extends Omit<FormFieldProps<T>, 'type'> {
    options: SelectOption<T[keyof T]>[];
}

export function SelectFormField<T extends FieldValues>({
    id,
    label,
    placeholder,
    error,
    helperText,
    control,
    fieldName,
    options,
}: Readonly<SelectFormFieldProps<T>>) {
    const isNumberOption = options.length > 0 && typeof options[0].value === 'number';

    return (
        <Field>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Controller
                name={fieldName as Path<T>}
                control={control}
                render={({ field }) => (
                    <Select 
                        value={field.value?.toString() ?? ""} 
                        onValueChange={(value) => {
                            field.onChange(isNumberOption ? Number(value) : value);
                        }}
                    >
                        <SelectTrigger aria-invalid={!!error}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value.toString()}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            <FieldDescription className={error ? "text-red-500" : ""}>
                {error || helperText || ""}
            </FieldDescription>
        </Field>
    );
}