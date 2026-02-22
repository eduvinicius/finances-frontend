import type { ComponentProps } from "react"

import { Dialog as DialogPrimitive } from "radix-ui"

export function DialogClose({
  ...props
}: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}
