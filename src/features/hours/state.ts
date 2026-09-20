import { formatInTimeZone, toDate } from "date-fns-tz"
import { isBefore, isAfter } from "date-fns"
import type { SiteConfig } from "@/content/site.config"

export type OpeningStatus = "pre_opening" | "open" | "closed"

export interface OpeningState {
  status: OpeningStatus
  message: string
}

const TIMEZONE = "Asia/Dhaka"

export function getOpeningState(now: Date, config: SiteConfig): OpeningState {
  // Pre-opening check
  if (config.openingDate) {
    const openingDate = new Date(config.openingDate)
    if (isBefore(now, openingDate)) {
      const formattedDate = formatInTimeZone(openingDate, TIMEZONE, "d MMMM")
      return {
        status: "pre_opening",
        message: `Opening ${formattedDate}`,
      }
    }
  }

  // Determine outlet hours (assuming first outlet for global announcement)
  const outlet = config.outlets[0]
  if (!outlet || !outlet.hours) {
    return {
      status: "closed",
      message: "Closed today",
    }
  }

  // Parse hours, format: "09:00 - 22:00"
  const [openStr, closeStr] = outlet.hours.split("-").map((s) => s.trim())
  
  if (!openStr || !closeStr) {
    return {
      status: "closed",
      message: "Closed today",
    }
  }

  // Get current time in Dhaka
  const nowDhakaStr = formatInTimeZone(now, TIMEZONE, "yyyy-MM-dd")
  const openTimeDhaka = toDate(`${nowDhakaStr}T${openStr}:00`, { timeZone: TIMEZONE })
  const closeTimeDhaka = toDate(`${nowDhakaStr}T${closeStr}:00`, { timeZone: TIMEZONE })

  // If now is before openTime or after closeTime
  if (isBefore(now, openTimeDhaka) || isAfter(now, closeTimeDhaka)) {
    // If after closeTime, next open time is tomorrow
    let nextOpenTime = openTimeDhaka
    if (isAfter(now, closeTimeDhaka)) {
      nextOpenTime = toDate(`${formatInTimeZone(new Date(now.getTime() + 86400000), TIMEZONE, "yyyy-MM-dd")}T${openStr}:00`, { timeZone: TIMEZONE })
    }

    // Format like 9 AM or 9:30 AM
    const formattedTime = formatInTimeZone(nextOpenTime, TIMEZONE, "h:mm a").replace(":00", "").toLowerCase()
    
    return {
      status: "closed",
      message: `Closed — opens at ${formattedTime}`,
    }
  }

  // Open
  return {
    status: "open",
    message: `Now open — ${outlet.address}`,
  }
}
