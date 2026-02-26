import React from "react";
import { Controller, type FieldValues, type Path } from "react-hook-form";
import type { FormFieldProps } from "@/shared/types/formBase.types";
import type { ISelectBaseProps } from "@/shared/types/selectBase.types";
import { Field, FieldDescription, FieldLabel } from "../ui/Field";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "../ui/Combobox";

interface ComboboxFieldProps<T extends FieldValues, O> extends Omit<FormFieldProps<T>, "type" | "placeholder"> {
    options: ISelectBaseProps<O>[];
    multiple?: boolean;
    emptyMessage?: string;
}

export function ComboboxField<T extends FieldValues, O>({
    id,
    label,
    error,
    helperText,
    control,
    fieldName,
    options,
    multiple = true,
    emptyMessage = "Nenhuma opção encontrada",
}: Readonly<ComboboxFieldProps<T, O>>) {
    const anchor = useComboboxAnchor();

    return (
        <Field>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Controller
                name={fieldName as Path<T>}
                control={control}
                render={({ field }) => {
                    const selectedOptions = options.filter(
                        (option) => field.value?.includes(option.value)
                    );

                    return (
                        <Combobox
                            multiple={multiple}
                            autoHighlight
                            value={selectedOptions}
                            onValueChange={(value: ISelectBaseProps<O> | ISelectBaseProps<O>[] | null) => {
                                if (value === null) {
                                    field.onChange(null);
                                } else {
                                    const valueArray = Array.isArray(value) ? value : [value];
                                    const values = valueArray.map((item) => item.value);
                                    field.onChange(multiple ? values : values[0] ?? null);
                                }
                            }}
                        >
                            <ComboboxChips ref={anchor} className="w-full">
                                <ComboboxValue>
                                    {(values: ISelectBaseProps<O>[]) => (
                                        <React.Fragment>
                                            {values.map((v) => (
                                                <ComboboxChip key={String(v.value)}>{v.label}</ComboboxChip>
                                            ))}
                                            <ComboboxChipsInput />
                                        </React.Fragment>
                                    )}
                                </ComboboxValue>
                            </ComboboxChips>
                            <ComboboxContent anchor={anchor}>
                                <ComboboxList>
                                    {options.map((option) => (
                                        <ComboboxItem key={String(option.value)} value={option}>
                                            {option.label}
                                        </ComboboxItem>
                                    ))}
                                    {options.length === 0 && (
                                        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    );
                }}
            />
            <FieldDescription className={error ? "text-red-500" : ""}>
                {error || helperText || ""}
            </FieldDescription>
        </Field>
    );
}