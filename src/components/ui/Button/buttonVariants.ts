import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-[var(--green-100)] text-[var(--gray-800)] hover:bg-[var(--green-200)]",
        green: "bg-[var(--green-200)] text-[var(--gray-800)] hover:bg-[var(--green-200)]",
        purple: "bg-[var(--purple-100)] text-[var(--gray-800)] hover:bg-[var(--purple-200)]",
        gray: "bg-[var(--gray-200)] text-[var(--gray-800)] hover:bg-[var(--gray-300)]",
        gradientHorizontal: "bg-[var(--gradient-horizontal)] text-[var(--gray-100)]",
        gradientVertical: "bg-[var(--gradient-vertical)] text-[var(--gray-100)]",
        outline: "border border-[var(--gray-300)] bg-[var(--gray-100)] text-[var(--gray-800)] shadow-xs hover:bg-[var(--gray-200)]",
        secondary: "bg-[var(--gray-300)] text-[var(--gray-800)] hover:bg-[var(--gray-400)]",
        ghost: "bg-transparent text-[var(--gray-800)] hover:bg-[var(--gray-200)]",
        link: "text-[var(--green-100)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)