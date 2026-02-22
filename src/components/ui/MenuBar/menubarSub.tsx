import type { ComponentProps } from "react"

import { Menubar as MenubarPrimitive } from "radix-ui"

export function MenubarSub({
  ...props
}: ComponentProps<typeof MenubarPrimitive.Sub>)
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}
