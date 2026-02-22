import type { ComponentProps } from "react"

import { Tooltip as TooltipPrimitive } from "radix-ui"

function TooltipTrigger({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

export { TooltipTrigger }
