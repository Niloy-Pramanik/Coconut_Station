"use client"

import * as React from "react"
import { Phone, MessageCircle } from "lucide-react"
import { siteConfig } from "@/content/site.config"
import { cn } from "@/lib/utils"

export function QuickContact() {
  const [isOpen, setIsOpen] = React.useState(false)

  // We add `.has-bottom-bar` class dynamically via context or just use CSS siblings, 
  // but for simplicity we'll just position it at bottom-6, and if the bottom bar is visible, 
  // we add bottom-[88px] via global css or state. 
  // Since we don't have the real cart state here, we'll use a CSS class approach later.

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 sm:hidden pointer-events-none">
      <div 
        className={cn(
          "flex flex-col gap-3 transition-all duration-300 pointer-events-auto",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        {siteConfig.contact.phone && (
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-surface shadow-pop text-leaf-800 hover:bg-leaf-50 focus-ring"
            aria-label="Call us"
          >
            <Phone className="h-5 w-5 fill-current" />
          </a>
        )}
        {siteConfig.contact.whatsapp && (
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-pop text-white hover:bg-[#20bd5a] focus-ring"
            aria-label="WhatsApp us"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-leaf-800 shadow-pop text-white hover:bg-leaf-900 focus-ring pointer-events-auto transition-transform active:scale-95"
        aria-label="Contact options"
        aria-expanded={isOpen}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  )
}
