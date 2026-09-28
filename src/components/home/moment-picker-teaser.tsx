"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"

const MOMENTS = [
  {
    id: "morning",
    title: "Morning Boost",
    blurb: "Start your day with natural hydration and a clean energy kick.",
    products: [
      { id: "water", name: "Premium Coconut Water", image: "/assets/products/water-300ml.webp" },
      { id: "coffee", name: "Coconut Coffee", image: "/assets/products/coffee.webp" },
    ],
  },
  {
    id: "workout",
    title: "Post-Workout",
    blurb: "Replenish your electrolytes naturally after a hard session.",
    products: [
      { id: "coconut", name: "Fresh Raw Coconut", image: "/assets/products/coconut-premium.webp" },
      { id: "water-small", name: "Coconut Water 200ml", image: "/assets/products/water-200ml.webp" },
    ],
  },
  {
    id: "dessert",
    title: "Guilt-free Dessert",
    blurb: "Satisfy your sweet tooth with our natural, low-sugar treats.",
    products: [
      { id: "pudding", name: "Classic Pudding", image: "/assets/products/pudding-classic-v2.png" },
      { id: "shake", name: "Signature Shake", image: "/assets/products/shake-classic.webp" },
    ],
  },
]

export function MomentPickerTeaser() {
  const [activeMomentId, setActiveMomentId] = React.useState(MOMENTS[0].id)
  const activeMoment = MOMENTS.find((m) => m.id === activeMomentId) || MOMENTS[0]

  return (
    <section className="py-24 bg-canvas overflow-hidden">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left: Controls */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold text-leaf-800 uppercase mb-8">
              Find Your Moment
            </h2>
            <div className="flex flex-col gap-4 mb-8">
              {MOMENTS.map((moment) => (
                <button
                  key={moment.id}
                  onClick={() => setActiveMomentId(moment.id)}
                  className={`text-left px-6 py-4 rounded-lg border-[1.5px] transition-all duration-200 focus-ring ${
                    activeMomentId === moment.id
                      ? "border-leaf-700 bg-leaf-50 shadow-soft"
                      : "border-line bg-transparent hover:border-leaf-300 hover:bg-canvas"
                  }`}
                  aria-pressed={activeMomentId === moment.id}
                >
                  <h3 className={`text-xl font-semibold mb-1 ${activeMomentId === moment.id ? "text-leaf-800" : "text-ink"}`}>
                    {moment.title}
                  </h3>
                  <p className={`text-sm ${activeMomentId === moment.id ? "text-leaf-900" : "text-ink-soft"}`}>
                    {moment.blurb}
                  </p>
                </button>
              ))}
            </div>
            
            <div>
              <Button variant="link" asChild className="px-0">
                <Link href="/why-coconut">Learn more about our moments &rarr;</Link>
              </Button>
            </div>
          </div>

          {/* Right: Products Display */}
          <div className="w-full lg:w-2/3">
            <div className="bg-leaf-100/50 rounded-xl p-8 lg:p-12 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMoment.id}
                  className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  {activeMoment.products.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-canvas border border-line rounded-2xl p-6 flex flex-col items-center text-center group tile hover:border-leaf-200 hover:shadow-lift transition-all duration-300 cursor-default"
                    >
                      <div className="relative w-40 h-40 mb-6 bg-leaf-50/50 rounded-full flex items-center justify-center p-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110 p-2"
                        />
                      </div>
                      <h4 className="text-xl font-bold text-ink mb-1 group-hover:text-leaf-800 transition-colors">
                        {product.name}
                      </h4>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
