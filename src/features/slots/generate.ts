export interface DeliverySlot {
  id: string
  label: string
  isAvailable: boolean
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date)
}

function formatDayAndDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(date)
}

/**
 * Generates available delivery slots for the next 3 days.
 * - Delivery hours are typically 10 AM to 8 PM.
 * - Cut-off time for same-day delivery could be implemented here.
 */
export function generateDeliverySlots(): DeliverySlot[] {
  const slots: DeliverySlot[] = []
  
  const now = new Date()
  const currentHour = now.getHours()

  if (currentHour < 16) {
    slots.push({
      id: 'today-evening',
      label: `Today, ${formatDate(now)} (5 PM - 8 PM)`,
      isAvailable: true
    })
  }

  const tomorrow = addDays(now, 1)
  slots.push({
    id: 'tomorrow-morning',
    label: `Tomorrow, ${formatDate(tomorrow)} (10 AM - 1 PM)`,
    isAvailable: true
  })
  
  slots.push({
    id: 'tomorrow-afternoon',
    label: `Tomorrow, ${formatDate(tomorrow)} (2 PM - 5 PM)`,
    isAvailable: true
  })

  const dayAfter = addDays(tomorrow, 1)
  slots.push({
    id: 'day-after-morning',
    label: `${formatDayAndDate(dayAfter)} (10 AM - 1 PM)`,
    isAvailable: true
  })

  return slots
}
