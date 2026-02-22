import type { ComponentProps } from "react"

import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

export function DropdownMenuSub({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}
