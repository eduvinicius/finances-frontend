import type { ComponentProps } from "react"

import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { inputGroupButtonVariants } from "@/components/ui/InputGroup/inputGroupButtonVariants"

import { Button } from "@/components/ui/Button"

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

export { InputGroupButton }
