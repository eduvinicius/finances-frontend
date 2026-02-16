import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn } from "@/lib/utils"

function ComboboxGroup({ className, ...props }: Readonly<ComboboxPrimitive.Group.Props>) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

export { ComboboxGroup }
