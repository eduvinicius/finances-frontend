import type { Control, FieldValues, UseFormRegister } from "react-hook-form";

export interface IFormBaseProps<T> {
    onSubmit: (data: T) => void;
    loading?: boolean;
    initialValues?: T;
}

export interface FormFieldProps<T extends FieldValues> {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    error?: string;
    helperText?: string;
    register?: UseFormRegister<T>;
    fieldName: keyof T;
    control: Control<T>;
}

export interface DateFieldProps<T extends FieldValues> {
    control: Control<T>;
    error?: string;
}