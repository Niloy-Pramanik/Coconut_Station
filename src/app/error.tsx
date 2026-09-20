"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service if available
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10 text-danger mb-6">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-leaf-800 tracking-tight sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 text-base text-ink-muted max-w-md">
        We encountered an unexpected error. Please try again.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => reset()} variant="primary">
          Try again
        </Button>
      </div>
    </div>
  )
}
