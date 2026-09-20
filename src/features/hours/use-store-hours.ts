"use client"

import { useState, useEffect } from "react"
import { getOpeningState, OpeningState } from "./state"
import { siteConfig } from "@/content/site.config"

export function useStoreHours() {
  const [openingState, setOpeningState] = useState<OpeningState>({
    status: "closed",
    message: "Checking hours...",
  })

  useEffect(() => {
    // Update immediately on mount
    setOpeningState(getOpeningState(new Date(), siteConfig))

    // Set up interval to update every minute
    const interval = setInterval(() => {
      setOpeningState(getOpeningState(new Date(), siteConfig))
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return {
    state: openingState.status,
    message: openingState.message,
  }
}
