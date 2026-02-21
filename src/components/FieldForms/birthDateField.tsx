import type { UserFormValues } from "@/shared/types/user.types";
import { Controller } from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "../ui/Field";
import type { DateFieldProps } from "@/shared/types/formBase.types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function BirthDateField({ control, error }: Readonly<DateFieldProps<UserFormValues>>) {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(1900, 0, 1);
    const endDate = new Date(currentYear, 11, 31);

    return (
        <Field>
            <FieldLabel htmlFor="birthDate">Data de Nascimento</FieldLabel>
            <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                    <Popover>
                        <PopoverTrigger className="text-white" asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal bg-transparent hover:bg-transparent",
                                    !field.value && "text-muted-foreground"
                                )}
                                type="button"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                    format(field.value, "PPP", { locale: ptBR })
                                ) : (
                                    <span>Selecione a data</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                captionLayout="dropdown-years"
                                startMonth={startDate}
                                endMonth={endDate}
                            />
                        </PopoverContent>
                    </Popover>
                )}
            />
            <FieldDescription className={error ? "text-red-500" : ""}>
                {error || ""}
            </FieldDescription>
        </Field>
    );
}