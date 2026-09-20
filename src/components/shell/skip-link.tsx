import * as React from "react"

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-leaf-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus-ring"
    >
      Skip to main content
    </a>
  )
}
