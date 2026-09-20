import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  label?: string
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, label, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={label}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        <div className="h-2 w-full overflow-hidden rounded-pill bg-leaf-100">
          <div
            className="h-full bg-leaf-700 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {label && (
          <div className="text-xs font-semibold text-leaf-800">{label}</div>
        )}
      </div>
    )
  }
)
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }
