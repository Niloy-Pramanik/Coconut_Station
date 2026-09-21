"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { MessageCircle, Facebook } from "lucide-react"

const CATEGORIES = [
  { id: "coconut", label: "Live Coconut" },
  { id: "water", label: "Coconut Water" },
]

const SIZES = {
  coconut: [
    {
      id: "lite",
      name: "Lite",
      ml: "250-300 ml",
      price: "৳80",
      image: "/assets/products/coconut-lite.webp",
    },
    {
      id: "regular",
      name: "Regular",
      ml: "300-350 ml",
      price: "৳100",
      image: "/assets/products/coconut-regular.webp",
    },
    {
      id: "premium",
      name: "Premium",
      ml: "350-450 ml",
      price: "৳120",
      image: "/assets/products/coconut-premium.webp",
    },
  ],
  water: [
    {
      id: "200ml",
      name: "200 ml",
      ml: "200 ml",
      price: "৳50",
      image: "/assets/products/water-200ml.webp",
    },
    {
      id: "300ml",
      name: "300 ml",
      ml: "300 ml",
      price: "৳70",
      image: "/assets/products/water-300ml.webp",
    },
    {
      id: "500ml",
      name: "500 ml",
      ml: "500 ml",
      price: "৳100",
      image: "/assets/products/water-500ml.webp",
    },
    {
      id: "1l",
      name: "1 Litre",
      ml: "1000 ml",
      price: "৳180",
      image: "/assets/products/water-1l.webp",
    },
  ],
}

export function PickYourSize() {
  const [activeCategory, setActiveCategory] = React.useState<"coconut" | "water">("coconut")
  const [activeSizeId, setActiveSizeId] = React.useState(SIZES.coconut[1].id) // Default Regular

  const sizes = SIZES[activeCategory]
  const activeSize = sizes.find((s) => s.id === activeSizeId) || sizes[0]

  // When category changes, default to the middle/second size
  const handleCategoryChange = (cat: "coconut" | "water") => {
    setActiveCategory(cat)
    setActiveSizeId(SIZES[cat][1].id)
  }

  return (
    <section className="py-24 bg-canvas overflow-hidden relative">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left: Image display */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-leaf-50 to-canvas rounded-full flex items-center justify-center p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSize.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeSize.image}
                    alt={`${activeSize.name} ${activeCategory === "coconut" ? "Coconut" : "Water"}`}
                    fill
                    className="object-contain mix-blend-multiply"
                  />
                  {/* Contact shadow */}
                  <div className="absolute left-[20%] right-[20%] bottom-[8%] h-[10%] bg-[radial-gradient(ellipse_at_center,rgba(46,30,17,0.18),transparent_70%)] pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="w-full lg:w-1/2 max-w-lg">
            <h2 className="text-4xl font-extrabold text-leaf-800 uppercase mb-8">
              Pick Your Size
            </h2>

            {/* Category Segmented Control */}
            <div className="flex p-1 bg-line-soft rounded-pill w-fit mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id as "coconut" | "water")}
                  className={`relative px-6 py-2 rounded-pill text-sm font-semibold transition-colors z-10 focus-ring ${
                    activeCategory === cat.id ? "text-leaf-900" : "text-ink-soft hover:text-ink"
                  }`}
                  aria-pressed={activeCategory === cat.id}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="category-bg"
                      className="absolute inset-0 bg-canvas rounded-pill shadow-sm -z-10"
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    />
                  )}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Size selector pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setActiveSizeId(size.id)}
                  className={`px-5 py-2 rounded-pill border-[1.5px] text-sm font-semibold transition-colors focus-ring ${
                    activeSizeId === size.id
                      ? "border-leaf-700 bg-leaf-50 text-leaf-800"
                      : "border-line text-ink-soft hover:border-leaf-300 hover:text-ink"
                  }`}
                  aria-pressed={activeSizeId === size.id}
                >
                  {size.name}
                </button>
              ))}
            </div>

            {/* Details & CTA */}
            <div className="flex items-end justify-between border-t border-line pt-6">
              <div className="overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeSize.id}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p className="text-ink-muted font-medium mb-1">{activeSize.ml}</p>
                    <div className="text-3xl font-bold text-leaf-800 tabular-nums">
                      {activeSize.price}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="flex gap-2">
                <a 
                  href={`https://wa.me/8801796894640?text=${encodeURIComponent(`Hi Coconut Station! I would like to order: 1x ${activeCategory === "coconut" ? "Live Coconut" : "Coconut Water"} (${activeSize.name}) - ${activeSize.price}. Please let me know how to proceed with delivery.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-4 flex items-center justify-center gap-2 bg-leaf-800 text-canvas hover:bg-leaf-900 transition-colors rounded-md font-semibold text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a 
                  href="https://m.me/coconutstationbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-4 flex items-center justify-center gap-2 bg-leaf-100 text-leaf-900 hover:bg-leaf-200 transition-colors rounded-md font-semibold text-sm"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
