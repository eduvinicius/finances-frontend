import * as React from "react"
import { Menubar as MenubarPrimitive } from "radix-ui"

export function MenubarSub({
  ...props
}: Readonly<React.ComponentProps<typeof MenubarPrimitive.Sub>>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}
