"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { IconNatural, IconFreshDaily, IconHygienic, IconPremium, IconSmartCut, IconDigitalPayment, IconHomeDelivery } from "@/components/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const TRUST_ITEMS = [
  {
    label: "100% Natural",
    icon: IconNatural,
    proof: "No added sugar, preservatives or artificial flavours.",
  },
  {
    label: "Fresh Daily",
    icon: IconFreshDaily,
    proof: "Harvested and delivered to our outlets every morning.",
  },
  {
    label: "Hygienic & Safe",
    icon: IconHygienic,
    proof: "Prepared in a sterile environment following strict safety protocols.",
  },
  {
    label: "Premium Quality",
    icon: IconPremium,
    proof: "Only A-grade coconuts selected by our experts.",
  },
  {
    label: "Smart Cutting",
    icon: IconSmartCut,
    proof: "Precision tools ensure a clean, mess-free experience.",
  },
  {
    label: "Digital Payment",
    icon: IconDigitalPayment,
    proof: "Pay easily with bKash, Nagad, Rocket or Card.",
  },
  {
    label: "Home Delivery",
    icon: IconHomeDelivery,
    proof: "Fast, spill-proof delivery straight to your doorstep.",
  },
]

export function TrustStrip() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 w-full overflow-hidden pb-4">
      <motion.div
        className="mx-auto w-full max-w-[1440px] px-4 lg:px-8"
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div 
          className="flex w-full items-center gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:justify-between lg:gap-4 lg:overflow-visible lg:pb-0"
          tabIndex={0}
          role="region"
          aria-label="Trust indicators"
        >
          <TooltipProvider delayDuration={300}>
            {TRUST_ITEMS.map((item, index) => {
              const Icon = item.icon
              return (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <motion.div
                      className="flex min-w-fit snap-center items-center gap-3 rounded-pill bg-canvas/90 px-4 py-2 shadow-soft backdrop-blur-md transition-colors hover:bg-canvas focus-ring"
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.04 }}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-leaf-700 bg-transparent text-leaf-800">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-semibold text-leaf-900 whitespace-nowrap">
                        {item.label}
                      </span>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="max-w-[200px] text-center">
                    {item.proof}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </TooltipProvider>
        </div>
      </motion.div>
    </div>
  )
}
