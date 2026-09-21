"use client"

import * as React from "react"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { motion } from "motion/react"
import { MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/content/site.config"
import { useStoreHours } from "@/features/hours/use-store-hours"

export function OutletSpotlight() {
  const outlet = siteConfig.outlets[0]
  const { state, message } = useStoreHours()

  const isOpen = state === "open"
  const isClosed = state === "closed"

  let badgeVariant = "info" as "info" | "warning" | "danger" | "default" | "completed"
  let badgeText = "Checking hours..."
  
  if (isOpen) {
    badgeVariant = "default"
    badgeText = "Open Now"
  } else if (isClosed) {
    badgeVariant = "danger"
    badgeText = "Closed"
  } else {
    // pre_opening
    badgeVariant = "info"
    badgeText = "Opening Soon"
  }

  return (
    <section className="py-24 bg-canvas overflow-hidden">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Left: Images */}
          <div className="w-full lg:w-1/2 relative h-[500px]">
            {/* Primary Image (Exterior) */}
            <motion.div
              className="absolute left-0 top-0 w-4/5 h-4/5 rounded-xl overflow-hidden shadow-soft z-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/assets/scenes/outlet-exterior.webp"
                alt={`${outlet.name} Exterior`}
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Secondary Element (Interactive Map) */}
            <motion.div
              className="absolute right-0 bottom-0 w-[65%] h-[60%] rounded-xl overflow-hidden shadow-lift z-20 border-4 border-canvas bg-leaf-50 flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <iframe 
                src="https://www.google.com/maps?q=Tangail,+Bangladesh,+1900&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover saturate-[0.85] contrast-[1.05]"
                title="Tangail Outlet Location Map"
              />
            </motion.div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-1/2 max-w-lg">
            <h2 className="text-4xl font-extrabold text-leaf-800 uppercase mb-8">
              Visit Us
            </h2>
            
            <div className="bg-leaf-50 rounded-xl p-8 shadow-sm mb-8">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-bold text-leaf-900">{outlet.name}</h3>
                <Badge variant={badgeVariant}>{badgeText}</Badge>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-6 h-6 text-leaf-700 shrink-0 mt-0.5" />
                <p className="text-ink-soft text-lg leading-relaxed">
                  {outlet.address}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-leaf-700 shrink-0 mt-0.5" />
                <div className="text-ink-soft text-lg leading-relaxed">
                  <p>{message}</p>
                  <p className="font-medium text-ink">{outlet.hours}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild variant="primary" size="lg">
                <Link href={outlet.directionsUrl || "/outlets"} target={outlet.directionsUrl ? "_blank" : undefined} rel={outlet.directionsUrl ? "noopener noreferrer" : undefined}>
                  <MapPin className="w-5 h-5 mr-2" />
                  Get directions
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/outlets">
                  More outlet details <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
