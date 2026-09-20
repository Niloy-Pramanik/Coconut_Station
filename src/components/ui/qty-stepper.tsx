import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface QtyStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
  disabled?: boolean
}

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  className,
  disabled = false,
}: QtyStepperProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div
      className={cn(
        "inline-flex items-center h-[44px] rounded-pill border-[1.5px] border-line bg-surface transition-colors",
        disabled && "pointer-events-none opacity-60",
        className
      )}
    >
      <button
        type="button"
        className="flex h-[44px] w-[44px] items-center justify-center text-leaf-800 hover:bg-leaf-50 active:bg-leaf-100 rounded-l-pill transition-colors disabled:text-ink-muted disabled:hover:bg-transparent focus-ring"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-5 w-5" strokeWidth={1.75} />
      </button>
      <div className="flex h-full min-w-[44px] items-center justify-center font-sans text-base font-semibold text-ink tabular-nums">
        {value}
      </div>
      <button
        type="button"
        className="flex h-[44px] w-[44px] items-center justify-center text-leaf-800 hover:bg-leaf-50 active:bg-leaf-100 rounded-r-pill transition-colors disabled:text-ink-muted disabled:hover:bg-transparent focus-ring"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-5 w-5" strokeWidth={1.75} />
      </button>
    </div>
  )
}
