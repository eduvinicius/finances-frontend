import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function CardTitle({ title, className, ...props }: { title: string } & ComponentProps<"h1">) {
  return (
    <h1
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    >
      {title}
    </h1>
  )
}

export { CardTitle }
