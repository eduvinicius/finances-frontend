import type { ComponentProps } from "react"

import { Popover as PopoverPrimitive } from "radix-ui"

function Popover({
  ...props
}: Readonly<ComponentProps<typeof PopoverPrimitive.Root>>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

export { Popover }
