import * as React from "react"

import { cn } from "@/lib/utils"

function PopoverDescription({
  className,
  ...props
}: Readonly<React.ComponentProps<"p">>) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export { PopoverDescription }
