import type { ComponentProps } from "react"

import { Menubar as MenubarPrimitive } from "radix-ui"

export function MenubarPortal({
  ...props
}: ComponentProps<typeof MenubarPrimitive.Portal>)
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}
