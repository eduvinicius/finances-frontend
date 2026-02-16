import { Combobox as ComboboxPrimitive } from "@base-ui/react"

function ComboboxValue({ ...props }: Readonly<ComboboxPrimitive.Value.Props>) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

export { ComboboxValue }
