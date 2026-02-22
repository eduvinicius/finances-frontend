import type { ComponentProps } from "react"

import { Dialog as DialogPrimitive } from "radix-ui"

export function Dialog({
  ...props
}: Readonly<ComponentProps<typeof DialogPrimitive.Root>>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}
