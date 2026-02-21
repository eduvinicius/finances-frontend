import type { ComponentProps } from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

export function DropdownMenu({
  ...props
}: Readonly<ComponentProps<typeof DropdownMenuPrimitive.Root>>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}
