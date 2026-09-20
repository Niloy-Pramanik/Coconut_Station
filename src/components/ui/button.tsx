import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-pill transition-all duration-fast focus-visible:outline-none disabled:pointer-events-none disabled:bg-sand disabled:text-ink-muted disabled:shadow-none focus-ring",
  {
    variants: {
      variant: {
        primary:
          "bg-leaf-700 text-white font-semibold hover:bg-leaf-800 active:bg-leaf-900 active:scale-98 shadow-sm",
        secondary:
          "bg-transparent border-[1.5px] border-leaf-700 text-leaf-800 font-semibold hover:bg-leaf-50",
        ghost: "text-leaf-800 font-semibold hover:bg-leaf-50",
        link: "text-leaf-700 underline underline-offset-4 font-semibold hover:text-leaf-800",
        "on-dark":
          "bg-canvas text-leaf-900 font-semibold",
        "secondary-on-dark":
          "bg-transparent border-[1.5px] border-canvas text-canvas font-semibold",
        danger:
          "bg-danger text-white font-semibold",
      },
      size: {
        md: "h-[44px] px-[20px] text-sm",
        lg: "h-[52px] px-[28px] text-base",
        icon: "h-[44px] w-[44px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
