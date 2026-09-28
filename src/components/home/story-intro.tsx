"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"

export function StoryIntro() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-24 bg-canvas overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-soft"
          >
            <Image
              src="/assets/scenes/outlet-exterior.webp"
              alt="Coconut Station Outlet"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start"
          >
            <h2 className="text-4xl font-extrabold text-leaf-800 uppercase tracking-tight mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-ink-soft leading-relaxed mb-8">
              <p>
                We started with a simple belief: everyone deserves access to healthy, natural, and hygienic coconut water. From selecting the finest coconuts to serving them chilled, we are committed to bringing you the best nature has to offer.
              </p>
              <p>
                Our vision is to build a vibrant community where healthy living is accessible and enjoyable, making fresh coconut water a daily staple for everyone.
              </p>
            </div>
            <Button asChild variant="link" className="p-0 h-auto text-lg text-leaf-700 hover:text-leaf-800">
              <Link href="/about">Read our story &rarr;</Link>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
