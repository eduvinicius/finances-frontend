import type { ComponentProps } from "react"

import { Menubar as MenubarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

export function MenubarSeparator({
  className,
  ...props
}: ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}
