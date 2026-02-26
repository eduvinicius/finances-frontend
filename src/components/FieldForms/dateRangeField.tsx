import { useState } from "react";
import { CalendarIcon, XIcon } from "lucide-react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { Field, FieldDescription, FieldLabel } from "../ui/Field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Button } from "../ui/Button";
import { Calendar } from "@/components/ui/Calendar";

interface DateRangeFieldProps<T extends FieldValues> {
    id?: string;
    label?: string;
    fromFieldName: Path<T>;
    toFieldName: Path<T>;
    control: Control<T>;
    error?: string;
    helperText?: string;
    className?: string;
}

export function DateRangeField<T extends FieldValues>({
    id = "date-range",
    label = "Período",
    fromFieldName,
    toFieldName,
    control,
    error,
    helperText,
    className,
}: Readonly<DateRangeFieldProps<T>>) {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const getDateRangeText = () => {
        if (dateRange?.from && dateRange?.to) {
            return `${format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}`;
        }
        if (dateRange?.from) {
            return format(dateRange.from, "dd/MM/yyyy", { locale: ptBR });
        }
        return "Selecione um período";
    };

    return (
        <Field className={className}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Controller
                name={fromFieldName}
                control={control}
                render={({ field: fromField }) => (
                    <Controller
                        name={toFieldName}
                        control={control}
                        render={({ field: toField }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id={id}
                                        className="justify-start px-2.5 font-normal w-full bg-transparent hover:bg-(--green-300)"
                                        type="button"
                                    >
                                        <CalendarIcon color="white" />
                                        {getDateRangeText()}
                                        {dateRange?.from && (
                                            <XIcon
                                                className="ml-auto size-4 opacity-50 hover:opacity-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDateRange(undefined);
                                                    fromField.onChange(undefined);
                                                    toField.onChange(undefined);
                                                }}
                                            />
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        defaultMonth={dateRange?.from}
                                        selected={dateRange}
                                        onSelect={(range) => {
                                            setDateRange(range);
                                            fromField.onChange(range?.from);
                                            toField.onChange(range?.to);
                                        }}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                )}
            />
            <FieldDescription className={error ? "text-red-500" : ""}>
                {error || helperText || ""}
            </FieldDescription>
        </Field>
    );
}