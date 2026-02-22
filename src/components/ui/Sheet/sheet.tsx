"use client"

import type { ComponentProps } from "react"

import { Dialog as SheetPrimitive } from "radix-ui"

function Sheet({ ...props }: Readonly<ComponentProps<typeof SheetPrimitive.Root>>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

export { Sheet }
