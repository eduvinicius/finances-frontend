"use client"

import type { ComponentProps } from "react"

import { Dialog as SheetPrimitive } from "radix-ui"

function SheetPortal({
  ...props
}: Readonly<ComponentProps<typeof SheetPrimitive.Portal>>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

export { SheetPortal }
