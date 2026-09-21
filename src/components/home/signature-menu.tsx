"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCatalog } from "@/components/catalog-provider"
import { isOrderable } from "@/features/catalog/utils"
import { useCartStore } from "@/features/cart/store"
import { toast } from "sonner"

export function SignatureMenu() {
  const catalog = useCatalog()
  const products = catalog.filter(p => p.status !== 'hidden').sort((a, b) => a.sort - b.sort).slice(0, 8)
  const { addItem } = useCartStore()

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
          
          {products.map((product, i) => {
            const variant = product.variants[0]
            if (!variant) return null
            const orderable = isOrderable(variant)

            return (
              <motion.div
                key={product.slug}
                className="shrink-0 w-[260px] snap-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.42, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/menu/${product.slug}`} className="block group focus-ring rounded-lg">
                  <div className="relative aspect-square mb-4 tile transition-transform duration-320 group-hover:shadow-lift group-hover:-translate-y-1 bg-leaf-50 rounded-lg p-6 flex flex-col justify-end overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-leaf-100/50 to-transparent" />
                    <div className="relative h-full w-full">
                      <Image
                        src={variant.imageSrc}
                        alt={variant.imageAlt}
                        fill
                        className="object-contain mix-blend-multiply transition-transform duration-320 group-hover:scale-105 origin-bottom"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-ink mb-1 group-hover:text-leaf-800 transition-colors">
                    {product.nameEn}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-leaf-700 font-semibold">
                      {variant.priceBDT ? `৳${variant.priceBDT}` : 'Ask at outlet'}
                    </span>
                    {orderable && (
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full border-line text-ink-soft hover:text-leaf-800 hover:border-leaf-700 hover:bg-leaf-50"
                        onClick={(e) => {
                          e.preventDefault()
                          addItem(variant.sku, 1)
                          toast.success(`Added ${product.nameEn} to cart`)
                        }}
                        aria-label={`Add ${product.nameEn} to cart`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
          
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
