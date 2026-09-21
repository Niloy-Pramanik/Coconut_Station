"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Hotspot coordinates per design doc §5.2
const HOTSPOTS = [
  {
    id: "coconut",
    target: "live-coconut",
    desktop: { left: "63.6%", top: "67.3%" },
    mobile: { left: "63.6%", top: "67.0%" },
    name: "Live Coconut",
    priceText: "from ৳80",
    image: "/assets/products/coconut-regular.webp",
    link: "/menu/live-coconut",
    isOutlet: false,
  },
  {
    id: "water",
    target: "coconut-water",
    desktop: { left: "84.2%", top: "64.2%" },
    mobile: { left: "84.2%", top: "63.9%" },
    name: "Coconut Water",
    priceText: "from ৳50",
    image: "/assets/products/water-200ml.webp",
    link: "/menu/coconut-water",
    isOutlet: false,
  },
  {
    id: "coffee",
    target: "coconut-coffee",
    desktop: { left: "25.6%", top: "77.6%" },
    mobile: { left: "25.6%", top: "77.3%" },
    name: "Coconut Coffee",
    priceText: "from ৳120",
    image: "/assets/products/coffee-PLACEHOLDER.webp",
    link: "/menu/coconut-coffee",
    isOutlet: false,
  },
  {
    id: "pudding",
    target: "coconut-pudding",
    desktop: { left: "9.9%", top: "79.6%" },
    mobile: { left: "9.9%", top: "79.4%" },
    name: "Coconut Pudding",
    priceText: "from ৳90",
    image: "/assets/products/pudding-classic.webp",
    link: "/menu/coconut-pudding",
    isOutlet: false,
  },
  {
    id: "outlet",
    target: "/outlets",
    desktop: { left: "54.8%", top: "6.5%" },
    mobile: { left: "54.8%", top: "5.6%" },
    name: "Coconut Station — Tangail",
    priceText: "Open now",
    image: "/assets/scenes/outlet-exterior.webp",
    link: "/outlets",
    isOutlet: true,
  },
]

export function HeroHotspots() {
  const [openId, setOpenId] = React.useState<string | null>(null)
  const [isDesktop, setIsDesktop] = React.useState(true)
  const shouldReduceMotion = useReducedMotion()

  React.useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkIsDesktop()
    window.addEventListener("resize", checkIsDesktop, { passive: true })
    return () => window.removeEventListener("resize", checkIsDesktop)
  }, [])

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden sm:block hidden">
      {/* Container matched to the image positioning to ensure percentages align */}
      <div className="absolute inset-0 w-full h-full">
        {HOTSPOTS.map((hotspot, index) => {
          const position = isDesktop ? hotspot.desktop : hotspot.mobile

          return (
            <Popover
              key={hotspot.id}
              open={openId === hotspot.id}
              onOpenChange={(isOpen) => setOpenId(isOpen ? hotspot.id : null)}
            >
              <PopoverTrigger asChild>
                <motion.button
                  className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full pointer-events-auto group focus-ring"
                  style={{ left: position.left, top: position.top }}
                  initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                  aria-label={`${hotspot.name} — ${hotspot.isOutlet ? 'view details' : 'quick add'}`}
                >
                  <div className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-canvas shadow-soft z-10 group-hover:bg-leaf-50 transition-colors">
                    {/* Ring */}
                    <div className="absolute inset-[-3px] rounded-full border-[3px] border-leaf-700" />
                    {/* Pulse effect */}
                    {!shouldReduceMotion && (
                      <motion.div
                        className="absolute inset-[-3px] rounded-full border-[3px] border-leaf-700 pointer-events-none"
                        animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                        transition={{
                          duration: 2.4,
                          repeat: 2, // Three cycles after load
                          repeatType: "loop",
                          ease: "easeOut",
                          delay: 1.5 + index * 0.1,
                        }}
                      />
                    )}
                  </div>
                </motion.button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="center"
                className="w-[260px] p-4 pointer-events-auto"
                sideOffset={12}
                collisionPadding={12}
              >
                <div className="flex gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-canvas border border-line">
                    <Image
                      src={hotspot.image}
                      alt={hotspot.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-col flex-1 justify-center">
                    <h3 className="text-lg font-semibold leading-tight text-ink">
                      {hotspot.name}
                    </h3>
                    <p className="text-sm font-medium text-leaf-700 mt-1">
                      {hotspot.priceText}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between gap-3">
                  <Link
                    href={hotspot.link}
                    className="text-sm font-semibold text-leaf-700 hover:text-leaf-800 hover:underline focus-ring rounded-sm"
                  >
                    {hotspot.isOutlet ? "Visit outlet page" : "View"}
                  </Link>
                  {!hotspot.isOutlet && (
                    <Button size="md" variant="primary" className="h-8">
                      <Plus className="mr-1 h-4 w-4" />
                      Add
                    </Button>
                  )}
                  {hotspot.isOutlet && (
                    <Button size="md" variant="primary" className="h-8" asChild>
                      <Link href={hotspot.link}>Get directions</Link>
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )
        })}
      </div>
    </div>
  )
}
