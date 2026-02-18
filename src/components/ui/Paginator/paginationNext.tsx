import * as React from "react"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { PaginationLink } from "./paginationLink"

export function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5 text-white hover:bg-(--green-200)", className)}
      {...props}
    >
      <span className="hidden sm:block">Próxima</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}
