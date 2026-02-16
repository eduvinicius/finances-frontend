import * as React from "react"
import { Menubar as MenubarPrimitive } from "radix-ui"
import { IoChevronForward } from "react-icons/io5"
import { cn } from "@/lib/utils"

export function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-inset:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <IoChevronForward className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}
