import type { UserFormValues } from "@/shared/types/user.types";
import { Controller, type Control } from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "../ui/Field";
import { Input } from "../ui/Input";
import { unformatCPF } from "@/shared/utils/cpfValidation";

export function CPFField({ 
    control, 
    error
}: Readonly<{ 
    control: Control<UserFormValues>; 
    error?: string;
}>) {
    return (
        <Field>
            <FieldLabel htmlFor="documentNumber">CPF</FieldLabel>
            <Controller
                name="documentNumber"
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