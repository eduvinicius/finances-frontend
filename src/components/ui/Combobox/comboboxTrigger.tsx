import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function ComboboxTrigger({
  className,
  children,
  ...props
}: Readonly<ComboboxPrimitive.Trigger.Props>) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-slot="combobox-trigger-icon"
        className="text-muted-foreground pointer-events-none size-4"
      />
    </ComboboxPrimitive.Trigger>
  )
}

export { ComboboxTrigger }
