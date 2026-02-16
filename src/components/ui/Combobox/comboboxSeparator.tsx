import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn } from "@/lib/utils"

function ComboboxSeparator({
  className,
  ...props
}: Readonly<ComboboxPrimitive.Separator.Props>) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

export { ComboboxSeparator }
