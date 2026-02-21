import type { ComponentProps } from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import type { AvatarSize } from "@/shared/types/avatar.types"
import { AvatarSizeEnum } from "@/shared/enums/avatarEnum"

export function Avatar({
  className,
  size = AvatarSizeEnum.DEFAULT,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        className
      )}
      {...props}
    />
  )
}
