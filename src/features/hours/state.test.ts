import { describe, it, expect } from "vitest"
import { getOpeningState } from "./state"
import type { SiteConfig } from "@/content/site.config"

describe("getOpeningState", () => {
  const mockConfig: SiteConfig = {
    name: "Coconut Station",
    tagline: "",
    description: "",
    contact: { phone: "", whatsapp: "" },
    openingDate: "2026-08-16T10:00:00+06:00",
    outlets: [
      {
        id: "tangail",
        name: "Tangail",
        address: "Bottola Bazar More, Tangail",
        hours: "09:00 - 22:00",
        geo: null,
        directionsUrl: null,
      },
    ],
    delivery: { zones: [], freeDeliveryThreshold: null },
    payments: { wallets: { bkash: null, nagad: null, rocket: null } },
    social: { facebook: null, instagram: null, tiktok: null, youtube: null },
    imagery: { showIllustrativeLabel: true },
  }

  it("should return pre_opening state before opening date", () => {
    // 2026-08-15 10:00 AM Dhaka time (UTC+6)
    const now = new Date("2026-08-15T04:00:00Z")
    const result = getOpeningState(now, mockConfig)
    expect(result).toEqual({
      status: "pre_opening",
      message: "Opening 16 August",
    })
  })

  it("should return open state during opening hours", () => {
    // 2026-08-16 10:30 AM Dhaka time
    const now = new Date("2026-08-16T04:30:00Z")
    const result = getOpeningState(now, mockConfig)
    expect(result).toEqual({
      status: "open",
      message: "Now open — Bottola Bazar More, Tangail",
    })
  })

  it("should return closed state before opening hours on the same day", () => {
    // 2026-08-17 08:30 AM Dhaka time
    const now = new Date("2026-08-17T02:30:00Z")
    const result = getOpeningState(now, mockConfig)
    expect(result).toEqual({
      status: "closed",
      message: "Closed — opens at 9 am",
    })
  })

  it("should return closed state after opening hours", () => {
    // 2026-08-17 10:30 PM Dhaka time (22:30)
    const now = new Date("2026-08-17T16:30:00Z")
    const result = getOpeningState(now, mockConfig)
    expect(result).toEqual({
      status: "closed",
      message: "Closed — opens at 9 am", // Next day open time
    })
  })
})
