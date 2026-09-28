import * as React from "react"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Pastry Station | Coconut Station",
  description: "Cakes, Pastries, and more by Coconut Station.",
}

export default function PastryStationPage() {
  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-4xl mx-auto text-center">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold text-leaf-900 uppercase tracking-tight mb-4">
            Pastry Station
          </h1>
          <h2 className="text-2xl text-ink-soft mb-8">
            Cakes, Pastries, and more
          </h2>
          <p className="text-lg text-ink font-semibold">
            Coming soon to our online menu. For now, visit us at our outlet to see our daily selection!
          </p>
        </header>

        <div className="w-full aspect-[21/9] relative rounded-2xl overflow-hidden shadow-soft mb-16 bg-leaf-50">
          <Image
            src="/assets/scenes/hero-scene-desktop.webp"
            alt="Pastry Station"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
