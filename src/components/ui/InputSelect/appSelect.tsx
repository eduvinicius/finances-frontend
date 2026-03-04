import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./index"

export interface SelectOption<T extends string | number = string> {
  label: string
  value: T
}

export interface AppSelectProps<T extends string | number = string> {
  readonly options: SelectOption<T>[]
  readonly value: T
  readonly onValueChange: (value: T) => void
  readonly placeholder?: string
  readonly className?: string
  readonly disabled?: boolean
}

export function AppSelect<T extends string | number = string>({
  options,
  value,
  onValueChange,
  placeholder,
  className,
  disabled,
}: AppSelectProps<T>) {
  const isNumber = options.length > 0 && typeof options[0].value === "number"

  return (
    <Select
      value={String(value)}
      onValueChange={(v) => onValueChange((isNumber ? Number(v) : v) as T)}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
