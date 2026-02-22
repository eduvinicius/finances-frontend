import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export function BreadcrumbPage({ className, ...props }: ComponentProps<"a">) {
  return (
    <a
      data-slot="breadcrumb-page"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    >   
    </a>
  )
}
