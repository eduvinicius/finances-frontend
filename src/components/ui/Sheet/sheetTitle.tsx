"use client"

import type { ComponentProps } from "react"

import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function SheetTitle({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

export { SheetTitle }
