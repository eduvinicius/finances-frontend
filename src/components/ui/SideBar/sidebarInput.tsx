"use client"

import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

import { Input } from "../Input"

function SidebarInput({
  className,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  )
}

export { SidebarInput }
