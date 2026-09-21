"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const MOMENTS = [
  {
    id: "morning",
    title: "Morning Boost",
    blurb: "Start your day with natural hydration and a clean energy kick.",
    products: [
      { id: "water", name: "Coconut Water", price: "৳50", image: "/assets/products/water-300ml.webp" },
      { id: "coffee", name: "Coconut Coffee", price: "৳120", image: "/assets/posters/poster-coconut-water.webp" },
    ],
  },
  {
    id: "workout",
    title: "Post-Workout",
    blurb: "Replenish your electrolytes naturally after a hard session.",
    products: [
      { id: "water-large", name: "Coconut Water 1L", price: "৳180", image: "/assets/products/water-1l.webp" },
      { id: "meat", name: "Fresh Coconut Meat", price: "৳60", image: "/assets/posters/poster-live-coconut.webp" },
    ],
  },
  {
    id: "dessert",
    title: "Guilt-free Dessert",
    blurb: "Satisfy your sweet tooth with our natural, low-sugar treats.",
    products: [
      { id: "pudding", name: "Coconut Pudding", price: "৳90", image: "/assets/products/pudding-classic.webp" },
      { id: "shake", name: "Classic Shake", price: "৳140", image: "/assets/posters/poster-pudding.webp" },
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
                      className="bg-canvas rounded-lg p-6 shadow-soft flex flex-col items-center text-center group tile"
                    >
                      <div className="relative w-32 h-32 mb-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain mix-blend-multiply transition-transform duration-320 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-ink mb-1 group-hover:text-leaf-800 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-leaf-700 font-bold mb-4">{product.price}</p>
                      <Button variant="secondary" size="md" className="w-full">
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
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
