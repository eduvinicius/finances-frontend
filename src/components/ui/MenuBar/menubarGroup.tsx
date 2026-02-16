import * as React from "react"
import { Menubar as MenubarPrimitive } from "radix-ui"

export function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}
