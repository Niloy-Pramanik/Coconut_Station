"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const SIGNATURE_PRODUCTS = [
  {
    id: "live-coconut",
    name: "Live Coconut",
    price: "from ৳80",
    image: "/assets/products/coconut-regular.webp",
    link: "/menu/live-coconut",
  },
  {
    id: "coconut-water",
    name: "Coconut Water",
    price: "from ৳50",
    image: "/assets/products/water-300ml.webp",
    link: "/menu/coconut-water",
  },
  {
    id: "coconut-coffee",
    name: "Coconut Coffee",
    price: "from ৳120",
    image: "/assets/products/coffee-PLACEHOLDER.webp",
    link: "/menu/coconut-coffee",
  },
  {
    id: "coconut-pudding",
    name: "Coconut Pudding",
    price: "from ৳90",
    image: "/assets/products/pudding-classic.webp",
    link: "/menu/coconut-pudding",
  },
  {
    id: "shakes",
    name: "Coconut Shakes",
    price: "from ৳140",
    image: "/assets/products/shake-PLACEHOLDER.webp",
    link: "/menu/shakes",
  },
  {
    id: "juices",
    name: "Cold Pressed",
    price: "from ৳160",
    image: "/assets/products/juice-PLACEHOLDER.webp",
    link: "/menu/juices",
  },
  {
    id: "sweets",
    name: "Deshi Sweets",
    price: "from ৳180",
    image: "/assets/products/sweets-PLACEHOLDER.webp",
    link: "/menu/sweets",
  },
  {
    id: "merch",
    name: "Merchandise",
    price: "from ৳250",
    image: "/assets/products/merch-PLACEHOLDER.webp",
    link: "/menu/merch",
  },
]

export function SignatureMenu() {
  return (
    <section className="py-24 bg-canvas overflow-hidden">
      <div className="container px-4 max-w-7xl mx-auto mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-extrabold text-leaf-800 uppercase mb-4">
            Signature Menu
          </h2>
          <p className="text-lg text-ink-soft max-w-md">
            Our most loved coconut creations, prepared fresh daily just for you.
          </p>
        </div>
        <Button variant="link" asChild className="hidden sm:inline-flex">
          <Link href="/menu">View full menu &rarr;</Link>
        </Button>
      </div>

      <div className="w-full">
        {/* Horizontal Scroll Snap Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 lg:px-8 pb-8 gap-6 -mx-4 lg:-mx-8">
          {/* spacer for first item */}
          <div className="shrink-0 w-0 lg:w-[max(0px,calc((100vw-80rem)/2))]" />
          
          {SIGNATURE_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              className="shrink-0 w-[260px] snap-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.42, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={product.link} className="block group focus-ring rounded-lg">
                <div className="relative aspect-square mb-4 tile transition-transform duration-320 group-hover:shadow-lift group-hover:-translate-y-1 bg-leaf-50 rounded-lg p-6 flex flex-col justify-end overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-leaf-100/50 to-transparent" />
                  <div className="relative h-full w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain mix-blend-multiply transition-transform duration-320 group-hover:scale-105 origin-bottom"
                    />
                  </div>
                  {/* contact shadow is handled by `.tile` in global CSS or inline if preferred */}
                  <div className="absolute left-[20%] right-[20%] bottom-[8%] h-[10%] bg-[radial-gradient(ellipse_at_center,rgba(46,30,17,0.18),transparent_70%)] pointer-events-none" />
                </div>
                
                <h3 className="text-xl font-semibold text-ink mb-1 group-hover:text-leaf-800 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-leaf-700 font-semibold">{product.price}</span>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full border-line text-ink-soft hover:text-leaf-800 hover:border-leaf-700 hover:bg-leaf-50"
                    onClick={(e) => {
                      e.preventDefault()
                      // Add to cart logic will go here
                    }}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {/* spacer for last item */}
          <div className="shrink-0 w-4 lg:w-[max(0px,calc((100vw-80rem)/2))]" />
        </div>
      </div>

      <div className="container px-4 mt-4 sm:hidden">
        <Button variant="secondary" asChild className="w-full">
          <Link href="/menu">View full menu</Link>
        </Button>
      </div>
    </section>
  )
}
