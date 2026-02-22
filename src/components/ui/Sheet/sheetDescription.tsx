"use client"

import type { ComponentProps } from "react"

import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function SheetDescription({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export { SheetDescription }
