import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, leadingIcon, trailingIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leadingIcon && (
          <div className="absolute left-4 text-ink-muted flex items-center justify-center pointer-events-none">
            {leadingIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-[52px] w-full rounded-md border-[1.5px] border-line-strong bg-surface px-4 py-2 text-base font-sans transition-colors placeholder:text-ink-muted focus-ring focus-visible:border-leaf-700 disabled:cursor-not-allowed disabled:bg-sand disabled:text-ink-muted disabled:border-line",
            error && "border-danger focus-visible:border-danger",
            leadingIcon && "pl-11",
            trailingIcon && "pr-11",
            className
          )}
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
        {trailingIcon && (
          <div className="absolute right-4 text-ink-muted flex items-center justify-center pointer-events-none">
            {trailingIcon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
