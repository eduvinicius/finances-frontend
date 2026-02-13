import * as React from "react"
import { IoChevronForward } from "react-icons/io5"
import { cn } from "@/lib/utils"

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <IoChevronForward />}
    </li>
  )
}
