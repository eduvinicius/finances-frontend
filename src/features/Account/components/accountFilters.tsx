"use client"

import * as React from "react"
import { useState } from "react"
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
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/Combobox"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon, XIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import type { ISelectBaseProps } from "@/shared/types/selectBase.types"
import type { IFiltersBaseProps } from "@/shared/types/filtersBase.types"
import type { AccountFiltersValues } from "@/shared/types/account.types"
import { accountFiltersSchema } from "@/shared/schemas/accountFiltersSchema"
import { ACCOUNT_TYPE_OPTIONS } from "@/shared/constants/accountTypeOptions.const"
import type { AccountTypeEnum } from "@/shared/enums/accountTypeEnum"

export function AccountFilters({
    onFilter,
    onClear,
    loading = false,
}: Readonly<IFiltersBaseProps<AccountFiltersValues>>) {

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<AccountFiltersValues>({
        resolver: zodResolver(accountFiltersSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            accountType: [],
        },
    })

    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const anchor = useComboboxAnchor();

    const handleClearFilters = () => {
        reset({
            name: "",
            accountType: [],
        })

        setDateRange(undefined)
        
        if (onClear) {
            onClear()
        }
    }

    const getDateRangeText = () => {
        if (!dateRange?.from) {
            return <span className="text-white">Selecione o período</span>
        }
        
        if (dateRange.to) {
            return (
                <span className="text-white">
                    {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                    {format(dateRange.to, "dd/MM/yyyy")}
                </span>
            )
        }
        
        return <span className="text-white">{format(dateRange.from, "dd/MM/yyyy")}</span>
    }

    return (
        <form onSubmit={handleSubmit(onFilter)} className="w-full p-4 mt-4 bg-(--green-200) rounded-md shadow-sm border">
            <FieldSet className="space-y-4">
                <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Field>
                        <FieldLabel htmlFor="name">Nome</FieldLabel>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Buscar por nome..."
                                    aria-invalid={!!errors.name}
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                        <FieldDescription className={errors.name ? "text-red-500" : ""}>
                            {errors.name ? errors.name.message : ""}
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="accountType">Tipo de Conta</FieldLabel>
                        <Controller
                            name="accountType"
                            control={control}
                            render={({ field }) => {
                                const selectedOptions = ACCOUNT_TYPE_OPTIONS.filter(
                                    option => field.value?.includes(option.value)
                                )
                                
                                return (
                                    <Combobox
                                        multiple
                                        autoHighlight
                                        value={selectedOptions}
                                        onValueChange={(value: ISelectBaseProps<AccountTypeEnum>[]) => {
                                            const numericValues = value.map(item => item.value)
                                            field.onChange(numericValues)
                                        }}
                                    >
                                        <ComboboxChips ref={anchor} className="w-full">
                                            <ComboboxValue>
                                                {(values: ISelectBaseProps<AccountTypeEnum>[]) => (
                                                    <React.Fragment>
                                                        {values.map((value) => (
                                                            <ComboboxChip key={value.value}>{value.label}</ComboboxChip>
                                                        ))}
                                                        <ComboboxChipsInput />
                                                    </React.Fragment>
                                                )}
                                            </ComboboxValue>
                                        </ComboboxChips>
                                        <ComboboxContent anchor={anchor}>
                                            <ComboboxList>
                                                {ACCOUNT_TYPE_OPTIONS.map((option) => (
                                                    <ComboboxItem
                                                        key={option.value}
                                                        value={option}
                                                    >
                                                        {option.label}
                                                    </ComboboxItem>
                                                ))}
                                                {ACCOUNT_TYPE_OPTIONS.length === 0 && (
                                                    <ComboboxEmpty>Nenhum tipo encontrado</ComboboxEmpty>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                )
                            }}
                        />
                        <FieldDescription
                            className={errors.accountType ? "text-red-500" : ""}
                        >
                            {errors.accountType ? errors.accountType.message : ""}
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
                                                    className="justify-start px-2.5 font-normal w-full bg-transparent hover:bg-(--green-300) "
                                                >
                                                    <CalendarIcon
                                                        color="white"
                                                     />
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