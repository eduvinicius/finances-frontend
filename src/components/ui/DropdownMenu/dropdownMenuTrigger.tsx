import type { ComponentProps } from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

export function DropdownMenuTrigger({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}
