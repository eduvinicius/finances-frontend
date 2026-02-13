import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { inputGroupAddonVariants } from "@/components/ui/InputGroup/inputGroupAddonVariants"

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <button
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

export { InputGroupAddon }
