"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('analytics_consent')
    if (!consent) {
      setShow(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('analytics_consent', 'granted')
    setShow(false)
    window.location.reload() // Reload to run tracking scripts
  }

  const handleDecline = () => {
    localStorage.setItem('analytics_consent', 'denied')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-surface border-t border-line shadow-lg sm:p-6 sm:flex sm:items-center sm:justify-between animate-in slide-in-from-bottom-full">
      <div className="flex-1 max-w-4xl text-sm text-ink-soft">
        <p className="font-semibold text-ink mb-1">Cookie & Privacy Consent</p>
        <p>
          We use cookies and similar technologies (like Meta Pixel and Google Analytics) to improve your experience on our site, analyze performance, and deliver personalized marketing. 
          By clicking "Accept All", you agree to our use of these technologies.
        </p>
      </div>
      <div className="mt-4 flex gap-3 sm:mt-0 sm:ml-6 shrink-0">
        <Button variant="secondary" size="md" onClick={handleDecline}>
          Decline
        </Button>
        <Button size="md" onClick={handleAccept}>
          Accept All
        </Button>
      </div>
    </div>
  )
}
