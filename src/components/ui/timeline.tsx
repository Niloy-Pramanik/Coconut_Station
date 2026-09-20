import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type TimelineStatus = "done" | "current" | "upcoming" | "cancelled"

export interface TimelineStep {
  title: string
  description?: string
  status: TimelineStatus
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TimelineStep[]
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, steps, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-0", className)}
        {...props}
      >
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1

          return (
            <div
              key={index}
              className="group relative flex flex-row lg:flex-col items-start lg:flex-1"
            >
              <div className="flex flex-col lg:flex-row items-center w-8 lg:w-full">
                <div
                  className={cn(
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                    step.status === "done" &&
                      "border-leaf-700 bg-leaf-700 text-white",
                    step.status === "current" &&
                      "border-leaf-700 bg-surface shadow-[0_0_0_4px_rgba(54,99,24,0.1)]",
                    step.status === "upcoming" && "border-line bg-surface text-ink-muted",
                    step.status === "cancelled" && "border-danger bg-danger text-white"
                  )}
                >
                  {step.status === "done" && <Check className="h-4 w-4" strokeWidth={3} />}
                  {step.status === "current" && (
                    <div className="h-2.5 w-2.5 rounded-full bg-leaf-700 animate-pulse" />
                  )}
                </div>

                {!isLast && (
                  <div
                    className={cn(
                      "h-12 w-0.5 lg:h-0.5 lg:w-full lg:flex-1",
                      step.status === "done" ? "bg-leaf-700" : "bg-line"
                    )}
                  />
                )}
              </div>

              <div className="ml-4 lg:ml-0 lg:mt-4 lg:pr-8 flex flex-col justify-start">
                <h4
                  className={cn(
                    "text-sm font-semibold",
                    step.status === "cancelled" ? "text-danger" : "text-ink"
                  )}
                >
                  {step.title}
                </h4>
                {step.description && (
                  <p
                    className={cn(
                      "text-xs mt-1",
                      step.status === "cancelled" ? "text-danger/80" : "text-ink-muted"
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)
Timeline.displayName = "Timeline"

export { Timeline }
