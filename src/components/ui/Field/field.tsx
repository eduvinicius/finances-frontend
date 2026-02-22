import type { ComponentProps } from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { fieldVariants } from "@/components/ui/Field/fieldVariants"

function Field({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

export { Field }
