import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[96px] w-full rounded-md border-[1.5px] border-line-strong bg-surface px-4 py-3 text-base font-sans transition-colors placeholder:text-ink-muted focus-ring focus-visible:border-leaf-700 disabled:cursor-not-allowed disabled:bg-sand disabled:text-ink-muted disabled:border-line resize-y",
          error && "border-danger focus-visible:border-danger",
          className
        )}
        ref={ref}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
