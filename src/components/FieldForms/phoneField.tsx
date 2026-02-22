import { Controller, type Control } from "react-hook-form";
import type { UserFormValues } from "@/shared/types/user.types";
import { formatPhoneNumber } from "@/shared/utils/phoneNumberMask";
import { Field, FieldDescription, FieldLabel } from "../ui/Field";
import { Input } from "../ui/Input";

export function PhoneField({ 
    control, 
    error 
}: Readonly<{ 
    control: Control<UserFormValues>; 
    error?: string;
}>) {
    return (
        <Field>
            <FieldLabel htmlFor="phoneNumber">Telefone (Opcional)</FieldLabel>
            <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                    <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        aria-invalid={!!error}
                        value={field.value || ""}
                        onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            field.onChange(formatted);
                        }}
                        onBlur={field.onBlur}
                        maxLength={15}
                    />
                )}
            />
            <FieldDescription className={error ? "text-red-500" : ""}>
                {error || ""}
            </FieldDescription>
        </Field>
    );
}