"use client"

import type { ComponentProps } from "react"

import { Dialog as SheetPrimitive } from "radix-ui"

function SheetClose({
  ...props
}: ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

export { SheetClose }
