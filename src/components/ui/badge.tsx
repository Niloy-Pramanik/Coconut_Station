import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-pill px-2.5 h-[28px] text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-leaf-100 text-leaf-800",
        warning: "bg-warning-bg text-warning",
        preparing: "bg-[#F3E4D3] text-[#6B3A10]",
        info: "bg-info-bg text-info",
        completed: "bg-sand text-ink-soft",
        danger: "bg-danger-bg text-danger",
        "sold-out": "bg-line-soft text-ink-soft line-through",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
