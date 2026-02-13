import * as React from "react"
import { IoEllipsisHorizontal } from "react-icons/io5"
import { cn } from "@/lib/utils"

export function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"img">) {
  return (
    <img
      alt=""
      data-slot="breadcrumb-ellipsis"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <IoEllipsisHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </img>
  )
}
