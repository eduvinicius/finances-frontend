import type { ComponentProps } from "react"

import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

export function DropdownMenuPortal({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}
