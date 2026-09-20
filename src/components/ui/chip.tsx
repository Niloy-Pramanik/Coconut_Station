import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-pill transition-colors focus-ring cursor-pointer select-none",
  {
    variants: {
      variant: {
        category: "h-[40px] px-5 border-[1.5px] border-line text-sm font-semibold hover:bg-leaf-50",
        "category-active": "h-[40px] px-5 bg-leaf-700 text-white text-sm font-semibold hover:bg-leaf-800",
        
        size: "h-[32px] px-4 border-[1.5px] border-line-strong text-sm font-semibold hover:bg-leaf-50",
        "size-active": "h-[32px] px-4 bg-leaf-700 text-white text-sm font-semibold hover:bg-leaf-800",
        "size-disabled": "h-[32px] px-4 bg-sand text-ink-muted text-sm font-semibold line-through pointer-events-none cursor-not-allowed",
        
        tag: "h-[26px] px-3 bg-leaf-100 text-leaf-800 text-xs font-semibold cursor-default pointer-events-none",
        allergen: "h-[26px] px-3 bg-warning-bg text-warning text-xs font-semibold cursor-default pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "category",
    },
  }
)

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  active?: boolean
  disabled?: boolean
}

function Chip({ className, variant, active, disabled, ...props }: ChipProps) {
  let resolvedVariant = variant

  if (variant === "category" && active) resolvedVariant = "category-active"
  if (variant === "size") {
    if (disabled) resolvedVariant = "size-disabled"
    else if (active) resolvedVariant = "size-active"
  }

  return (
    <button
      type="button"
      className={cn(chipVariants({ variant: resolvedVariant }), className)}
      disabled={disabled || variant === "tag" || variant === "allergen"}
      {...props}
    />
  )
}

export { Chip, chipVariants }
