import type { ComponentProps } from "react"

import { Popover as PopoverPrimitive } from "radix-ui"

function PopoverTrigger({
  ...props
}: Readonly<ComponentProps<typeof PopoverPrimitive.Trigger>>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

export { PopoverTrigger }
