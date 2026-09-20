"use client"

import * as React from "react"
import { siteConfig } from "@/content/site.config"
import { getOpeningState, type OpeningState } from "@/features/hours/state"

export function AnnouncementBar() {
  const [state, setState] = React.useState<OpeningState | null>(null)

  React.useEffect(() => {
    // Initial state
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(getOpeningState(new Date(), siteConfig))

    // Update every minute to catch hour boundaries
    const interval = setInterval(() => {
       
    setState(getOpeningState(new Date(), siteConfig))
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  if (!state) {
    return <div className="h-10 w-full bg-leaf-900" />
  }

  return (
    <div className="flex h-10 w-full items-center justify-center bg-leaf-900 px-4 text-center text-sm font-medium text-white transition-colors duration-300">
      {state.message}
    </div>
  )
}
