import * as React from "react"
import { Menubar as MenubarPrimitive } from "radix-ui"

export function MenubarPortal({
  ...props
}: Readonly<React.ComponentProps<typeof MenubarPrimitive.Portal>>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}
