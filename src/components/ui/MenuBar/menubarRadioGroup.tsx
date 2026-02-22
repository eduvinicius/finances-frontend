import type { ComponentProps } from "react"

import { Menubar as MenubarPrimitive } from "radix-ui"

export function MenubarRadioGroup({
  ...props
}: ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}
