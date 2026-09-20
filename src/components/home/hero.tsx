"use client"

import * as React from "react"
import Link from "next/link"
import { getImageProps } from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { siteConfig } from "@/content/site.config"
import { Button } from "@/components/ui/button"
import { TrustStrip } from "./trust-strip"
import { HeroHotspots } from "./hero-hotspots"
import { IconSprig } from "@/components/icons"

const EASE_OUT_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const commonProps = { alt: "Coconut Station Fresh Products", fill: true, priority: true }
  
  const {
    props: { srcSet: desktopSrcSet, ...desktopRest },
  } = getImageProps({
    ...commonProps,
    src: "/assets/scenes/hero-scene-desktop.webp",
    className: "object-cover object-right sm:object-center",
  })
  
  const {
    props: { srcSet: mobileSrcSet,  },
  } = getImageProps({
    ...commonProps,
    src: "/assets/scenes/hero-scene-mobile.webp",
    className: "object-cover object-right",
  })

  // Framer Motion variants
  const variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_SOFT } },
  }

  const textVariants = {
    hidden: { y: "100%" },
    visible: { y: "0%", transition: { duration: 0.52, ease: EASE_OUT_SOFT } },
  }

  return (
    <section className="relative w-full overflow-hidden bg-canvas min-h-[640px] lg:min-h-[720px] flex flex-col justify-end lg:justify-center">
      {/* Background Image with art direction */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT_SOFT }}
        style={{ transformOrigin: "right center" }}
      >
        <picture>
          <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
          <source media="(max-width: 1023px)" srcSet={mobileSrcSet} />
          <img {...desktopRest} alt="Coconut Station Fresh Products" fetchPriority="high" className="object-cover object-right lg:object-center w-full h-full" />
        </picture>
        {/* Left Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/80 to-transparent w-full lg:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent lg:hidden" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 lg:px-8 py-20 lg:py-24 pointer-events-none">
        <div className="flex flex-col items-start max-w-2xl pointer-events-auto">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.08, ease: EASE_OUT_SOFT }}
            className="inline-flex items-center rounded-pill border border-leaf-700/20 bg-leaf-50 px-3 py-1 text-sm font-semibold text-leaf-800 mb-6 shadow-sm"
          >
            {siteConfig.tagline}
          </motion.div>

          <h1 className="flex flex-col text-6xl sm:text-7xl lg:text-[80px] font-extrabold text-leaf-800 tracking-[0.01em] uppercase leading-[0.95] mb-6">
            <span className="overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={shouldReduceMotion ? "visible" : "hidden"}
                animate="visible"
                variants={textVariants}
                transition={{ delay: 0.16 }}
              >
                FRESH.
              </motion.span>
            </span>
            <span className="overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={shouldReduceMotion ? "visible" : "hidden"}
                animate="visible"
                variants={textVariants}
                transition={{ delay: 0.24 }}
              >
                NATURAL.
              </motion.span>
            </span>
            <motion.span
              className="text-4xl sm:text-5xl lg:text-[56px] font-script text-espresso normal-case tracking-normal mt-2 flex items-center gap-4 origin-left"
              initial={shouldReduceMotion ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }}
              transition={{ duration: 0.7, delay: 0.42, ease: EASE_OUT_SOFT }}
            >
              Just for You.
              <motion.span
                initial={shouldReduceMotion ? { scale: 1, rotate: 0 } : { scale: 0.6, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.9, type: "spring" }}
                className="text-leaf-700 hidden sm:block"
              >
                <IconSprig className="h-8 w-auto" />
              </motion.span>
            </motion.span>
          </h1>

          <motion.p
            className="text-lg text-ink-soft max-w-md mb-10 leading-relaxed"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            variants={variants}
            transition={{ delay: 0.64 }}
          >
            Bringing nature&apos;s finest coconut experience to your everyday life.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            variants={variants}
            transition={{ delay: 0.78 }}
          >
            <Button asChild variant="primary" size="lg">
              <Link href="/menu">Explore Menu</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="bg-canvas/50 backdrop-blur-sm">
              <Link href="/outlets">Find an Outlet</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <HeroHotspots />
      <TrustStrip />
    </section>
  )
}
