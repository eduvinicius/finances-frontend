import * as React from "react"

import { cn } from "@/lib/utils"

function PopoverTitle({ className, ...props }: Readonly<React.ComponentProps<"h2">>) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

export { PopoverTitle }
