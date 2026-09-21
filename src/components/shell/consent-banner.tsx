"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"

export function ConsentBanner() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const consent = localStorage.getItem("analytics_consent")
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("analytics_consent", "granted")
    setIsVisible(false)
    // In a real implementation, we would initialize the analytics scripts here if they were waiting.
    // However, since we conditionally check localStorage in trackEvent, this is enough for basic compliance.
    window.dispatchEvent(new Event("consent_granted"))
  }

  const handleDecline = () => {
    localStorage.setItem("analytics_consent", "denied")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-20 sm:pb-4 pointer-events-none"
        >
          <div className="bg-canvas border border-line shadow-xl rounded-2xl max-w-3xl mx-auto p-6 pointer-events-auto flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 flex items-start gap-4">
              <div className="bg-leaf-100 p-3 rounded-full text-leaf-700 shrink-0">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-ink mb-1">We value your privacy</h3>
                <p className="text-sm text-ink-soft">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                </p>
              </div>
            </div>
            <div className="flex sm:flex-col gap-3 w-full sm:w-auto shrink-0">
              <Button onClick={handleAccept} variant="primary" className="flex-1">
                Accept
              </Button>
              <Button onClick={handleDecline} variant="secondary" className="flex-1">
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
