import type { ComponentProps } from "react"

import { Menubar as MenubarPrimitive } from "radix-ui"

export function MenubarMenu({
  ...props
}: ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}
