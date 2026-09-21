import * as React from "react"
import { Metadata } from "next"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/content/site.config"

export const metadata: Metadata = {
  title: "Outlets | Coconut Station",
  description: "Find a Coconut Station outlet near you.",
}

export default function OutletsPage() {
  const outlets = siteConfig.outlets

  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-5xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-leaf-900 uppercase tracking-tight mb-6">
            Our Outlets
          </h1>
          <p className="text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto">
            Find the freshest coconuts at our dedicated stations. We are continually growing to bring nature's perfect drink closer to you.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {outlets.map((outlet) => (
            <div key={outlet.id} className="bg-leaf-50 rounded-xl overflow-hidden shadow-soft flex flex-col">
              <div className="relative h-64 w-full bg-leaf-100">
                <Image
                  src="/assets/scenes/outlet-exterior.webp"
                  alt={outlet.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h2 className="text-3xl font-bold text-leaf-900 mb-6">{outlet.name}</h2>
                
                <div className="flex items-start gap-4 mb-4">
                  <MapPin className="w-6 h-6 text-leaf-700 shrink-0 mt-0.5" />
                  <p className="text-ink-soft text-lg leading-relaxed">
                    {outlet.address}
                  </p>
                </div>
                
                <div className="flex items-start gap-4 mb-8">
                  <Clock className="w-6 h-6 text-leaf-700 shrink-0 mt-0.5" />
                  <div className="text-ink-soft text-lg leading-relaxed">
                    <p>Open daily</p>
                    <p className="font-medium text-ink">{outlet.hours}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <Button asChild variant="primary" className="w-full">
                    <Link href={outlet.directionsUrl || "#"} target={outlet.directionsUrl ? "_blank" : undefined} rel={outlet.directionsUrl ? "noopener noreferrer" : undefined}>
                      <MapPin className="w-5 h-5 mr-2" />
                      Get directions
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Coming Soon Card */}
          <div className="bg-canvas border-2 border-dashed border-leaf-200 rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
            <MapPin className="w-12 h-12 text-leaf-300 mb-6" />
            <h2 className="text-3xl font-bold text-leaf-800 mb-4">Coming Soon</h2>
            <p className="text-ink-soft text-lg max-w-sm mb-8">
              We are expanding to Dhaka and Bogura. Stay tuned for our new locations!
            </p>
            <Button variant="secondary" asChild>
              <Link href="/#notify">Notify Me</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
