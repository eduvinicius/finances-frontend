import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import { buttonVariants, type Button } from "@/components/ui/Button"

export type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ComponentProps<typeof Button>, "size"> &
  ComponentProps<"a">

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
