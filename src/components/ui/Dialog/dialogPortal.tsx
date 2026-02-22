import type { ComponentProps } from "react"

import { Dialog as DialogPrimitive } from "radix-ui"

export function DialogPortal({
  ...props
}: Readonly<ComponentProps<typeof DialogPrimitive.Portal>>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}
