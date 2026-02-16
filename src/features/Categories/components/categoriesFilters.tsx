"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Calendar } from "@/components/ui/Calendar"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/Field"
import { Input } from "@/components/ui/Input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/Combobox"
import { categoriesFiltersSchema } from "@/shared/schemas/categoriesFiltersSchema"
import type { CategoriesFiltersProps, CategoriesFiltersValues } from "@/shared/types/categoriesFilters.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { TRANSACTION_TYPE_OPTIONS } from "@/shared/constants/transactionTypeOptions.const"
import { format } from "date-fns"
import { CalendarIcon, XIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

export function CategoriesFilters({
    onFilter,
    onClear,
    loading = false,
}: Readonly<CategoriesFiltersProps>) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<CategoriesFiltersValues>({
        resolver: zodResolver(categoriesFiltersSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            transactionType: [],
        },
    })

    const handleClearFilters = () => {
        reset({
            name: "",
            transactionType: [],
        })
        if (onClear) {
            onClear()
        }
    }

    const [dateRange, setDateRange] = React.useState<DateRange | undefined>()

    const getDateRangeText = () => {
        if (!dateRange?.from) {
            return <span>Selecione o período</span>
        }
        
        if (dateRange.to) {
            return (
                <>
                    {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                    {format(dateRange.to, "dd/MM/yyyy")}
                </>
            )
        }
        
        return format(dateRange.from, "dd/MM/yyyy")
    }

    return (
        <form onSubmit={handleSubmit(onFilter)} className="w-full p-4 mt-4 bg-(--green-200) rounded-md shadow-sm border">
            <FieldSet className="space-y-4">
                <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Field>
                        <FieldLabel htmlFor="name">Nome</FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Buscar por nome..."
                            aria-invalid={!!errors.name}
                            {...register("name")}
                        />
                        <FieldDescription className={errors.name ? "text-red-500" : ""}>
                            {errors.name ? errors.name.message : ""}
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="transactionType">Tipo de Transação</FieldLabel>
                        <Controller
                            name="transactionType"
                            control={control}
                            render={({ field }) => (
                                <Combobox
                                    multiple
                                    value={field.value?.map(String) ?? []}
                                    onValueChange={(value) => {
                                        const numericValues = value && value.length > 0 
                                            ? value.map(Number) 
                                            : []
                                        field.onChange(numericValues)
                                    }}
                                >
                                    <ComboboxInput
                                        placeholder="Selecione o tipo..."
                                        showClear={!!field.value?.length}
                                    />
                                    <ComboboxContent>
                                        <ComboboxList>
                                            {TRANSACTION_TYPE_OPTIONS.map((option) => (
                                                <ComboboxItem
                                                    key={option.value}
                                                    value={option.value.toString()}
                                                >
                                                    {option.label}
                                                </ComboboxItem>
                                            ))}
                                            <ComboboxEmpty>Nenhum tipo encontrado</ComboboxEmpty>
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            )}
                        />
                        <FieldDescription
                            className={errors.transactionType ? "text-red-500" : ""}
                        >
                            {errors.transactionType ? errors.transactionType.message : ""}
                        </FieldDescription>
                    </Field>

                    <Field className="md:col-span-2 lg:col-span-2">
                        <FieldLabel htmlFor="date-range">Período</FieldLabel>
                        <Controller
                            name="fromDate"
                            control={control}
                            render={({ field: fromField }) => (
                                <Controller
                                    name="toDate"
                                    control={control}
                                    render={({ field: toField }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date-range"
                                                    className="justify-start px-2.5 font-normal w-full"
                                                >
                                                    <CalendarIcon />
                                                    {getDateRangeText()}
                                                    {dateRange?.from && (
                                                        <XIcon
                                                            className="ml-auto size-4 opacity-50 hover:opacity-100"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setDateRange(undefined)
                                                                fromField.onChange(undefined)
                                                                toField.onChange(undefined)
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
                                                        setDateRange(range)
                                                        fromField.onChange(range?.from)
                                                        toField.onChange(range?.to)
                                                    }}
                                                    numberOfMonths={2}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                            )}
                        />
                        <FieldDescription className={errors.fromDate ? "text-red-500" : ""}>
                            {errors.fromDate ? errors.fromDate.message : ""}
                        </FieldDescription>
                    </Field>
                </FieldGroup>

                <div className="flex gap-2 justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClearFilters}
                        disabled={loading}
                    >
                        Limpar Filtros
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Filtrando..." : "Filtrar"}
                    </Button>
                </div>
            </FieldSet>
        </form>
    )
}