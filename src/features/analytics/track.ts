type AnalyticsEvent = {
  eventName: string
  payload?: Record<string, any>
}

// Global types for Window object
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    fbq?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export function trackEvent({ eventName, payload }: AnalyticsEvent) {
  if (typeof window === 'undefined') return

  // Check if consent was granted
  const consent = localStorage.getItem('analytics_consent')
  if (consent !== 'granted') return

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, payload)
  }

  // Meta Pixel
  if (window.fbq) {
    // Map GA4 standard events to Meta standard events where possible
    if (eventName === 'purchase') {
      window.fbq('track', 'Purchase', { value: payload?.value, currency: payload?.currency || 'BDT' })
    } else if (eventName === 'add_to_cart') {
      window.fbq('track', 'AddToCart', payload)
    } else if (eventName === 'begin_checkout') {
      window.fbq('track', 'InitiateCheckout')
    } else {
      window.fbq('trackCustom', eventName, payload)
    }
  }
}
