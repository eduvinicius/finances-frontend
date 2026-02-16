import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { InputGroupButton } from "@/components/ui/InputGroup"

function ComboboxClear({ className, ...props }: Readonly<ComboboxPrimitive.Clear.Props>) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

export { ComboboxClear }
