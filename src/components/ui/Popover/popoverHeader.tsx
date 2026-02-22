import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function PopoverHeader({ className, ...props }: Readonly<ComponentProps<"div">>) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props}
    />
  )
}

export { PopoverHeader }
