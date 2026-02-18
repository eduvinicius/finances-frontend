import * as React from "react"
import { ChevronLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { PaginationLink } from "./paginationLink"

export function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5 text-white hover:bg-(--green-200)", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Anterior</span>
    </PaginationLink>
  )
}
