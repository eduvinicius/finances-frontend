import type { ComponentProps } from "react"
import { IoChevronForward } from "react-icons/io5"
import { cn } from "@/lib/utils"

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: ComponentProps<"img">) {
  return (
    <img
      data-slot="breadcrumb-separator"
      alt=""
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <IoChevronForward />}
    </img>
  )
}
