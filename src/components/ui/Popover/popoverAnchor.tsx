import type { ComponentProps } from "react"

import { Popover as PopoverPrimitive } from "radix-ui"

function PopoverAnchor({
  ...props
}: Readonly<ComponentProps<typeof PopoverPrimitive.Anchor>>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { PopoverAnchor }
