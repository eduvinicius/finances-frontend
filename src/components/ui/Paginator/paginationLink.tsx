import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants, type Button } from "@/components/ui/Button"

export type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

export function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "green" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    >
        {props.children}
    </a>
  )
}
