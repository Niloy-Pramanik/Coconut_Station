"use client"

import * as React from "react"
import { motion } from "motion/react"
import { IconNatural, IconFreshDaily, IconHygienic } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const FACTS = [
  {
    id: "natural",
    title: "100% Natural",
    description: "Our coconuts have no added sugar, no preservatives, and no artificial flavours. Pure hydration just as nature intended.",
    icon: IconNatural,
  },
  {
    id: "fresh",
    title: "Freshly Prepared",
    description: "Harvested and delivered daily. We smart-cut and serve your coconut on the spot for maximum freshness.",
    icon: IconFreshDaily,
  },
  {
    id: "hygienic",
    title: "Hygienic & Chilled",
    description: "Served chilled with a sealed straw, prepared in a clean environment following strict safety protocols.",
    icon: IconHygienic,
  },
]

export function WhyCoconut() {
  return (
    <section className="py-24 bg-leaf-50 overflow-hidden">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-leaf-800 uppercase mb-4">
            Why Coconut?
          </h2>
          <p className="text-lg text-ink-soft max-w-2xl mx-auto mb-4">
            Discover the refreshing taste of our premium A-grade coconuts, selected for quality and sweetness.
          </p>
          <p className="text-xs text-ink-muted">
            * General information, not medical advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {FACTS.map((fact, i) => {
            const Icon = fact.icon
            return (
              <motion.div
                key={fact.id}
                className="bg-canvas rounded-lg p-8 shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.42, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-leaf-700 bg-leaf-50 text-leaf-800 mb-6">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-leaf-900 mb-3">{fact.title}</h3>
                <p className="text-ink-soft leading-relaxed">{fact.description}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center">
          <Button variant="secondary" size="lg" asChild className="bg-canvas">
            <Link href="/why-coconut">Learn more about our coconuts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
