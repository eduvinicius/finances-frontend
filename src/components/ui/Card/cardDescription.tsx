import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function CardDescription({ description, className, ...props }: { description: string } & ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    >
      {description}
    </p>
  )
}

export { CardDescription }
