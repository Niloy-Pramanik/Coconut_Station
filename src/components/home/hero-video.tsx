'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { siteConfig } from '@/content/site.config'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, PlayCircle, ShieldCheck } from 'lucide-react'

// Tiers based on brief
const TIERS = {
  SCRUB_2160: '/media/hero-scrub-2160.mp4',
  SCRUB_1440: '/media/hero-scrub-1440.mp4',
  SCRUB_1080: '/media/hero-scrub-1080.mp4',
  AUTO_720: '/media/hero-auto-720.mp4',
  AUTO_M_720: '/media/hero-auto-m-720x900.mp4',
}

const POSTERS = {
  FIRST: '/media/hero-poster-first.webp',
  LAST: '/media/hero-poster-last.webp',
  M_FIRST: '/media/hero-poster-m-first.webp',
  M_LAST: '/media/hero-poster-m-last.webp',
}

export function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Smoothing scroll with spring
  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.6
  })

  const [videoState, setVideoState] = useState<{
    src: string;
    poster: string;
    isAutoplay: boolean;
    useReducedMotion: boolean;
  } | null>(null)

  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Detect environment on mount
    const dpr = window.devicePixelRatio || 1
    const width = window.screen.width
    const isMobile = width < 768
    
    // Check connection if available
    const connection = (navigator as any).connection
    const isSlow = connection && (connection.saveData || connection.downlink < 10)
    
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      setVideoState({
        src: '',
        poster: isMobile ? POSTERS.M_LAST : POSTERS.LAST,
        isAutoplay: false,
        useReducedMotion: true
      })
      return
    }

    if (isTouch || isSlow || isMobile) {
      setVideoState({
        src: isMobile ? TIERS.AUTO_M_720 : TIERS.AUTO_720,
        poster: isMobile ? POSTERS.M_FIRST : POSTERS.FIRST,
        isAutoplay: true,
        useReducedMotion: false
      })
      return
    }

    // Desktop Scrub Tiers
    const logicalPixels = width * dpr
    let scrubSrc = TIERS.SCRUB_1080
    if (logicalPixels >= 3000) scrubSrc = TIERS.SCRUB_2160
    else if (logicalPixels >= 1800) scrubSrc = TIERS.SCRUB_1440

    setVideoState({
      src: scrubSrc,
      poster: POSTERS.FIRST,
      isAutoplay: false,
      useReducedMotion: false
    })
  }, [])

  // Sync scroll to video time
  useEffect(() => {
    if (!videoState || videoState.isAutoplay || videoState.useReducedMotion || hasError) return

    let rafId: number
    let lastTime = -1

    const updateTime = (latest: number) => {
      if (!videoRef.current || videoRef.current.seeking) return

      const duration = 8.0 // Fixed 8s as per brief
      const targetTime = latest * duration

      // Only update if change is > 1/48s (~0.02s) to prevent thrashing
      if (Math.abs(targetTime - lastTime) > 0.02) {
        videoRef.current.currentTime = targetTime
        lastTime = targetTime
      }
    }

    const unsubscribe = smoothedProgress.onChange((latest) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => updateTime(latest))
    })

    return () => {
      unsubscribe()
      cancelAnimationFrame(rafId)
    }
  }, [smoothedProgress, videoState, hasError])

  // Chapter Opacity Transforms
  // Chapter 1 (0.0): Headline + CTAs -> Fades out by 0.15
  const ch1Opacity = useTransform(smoothedProgress, [0, 0.12, 0.15], [1, 0.8, 0])
  
  // Chapter 2 (0.33): Line 2 fades in -> Stays
  const ch2Opacity = useTransform(smoothedProgress, [0.2, 0.33], [0, 1])
  
  // Chapter 3 (0.50): Product chips appear
  const ch3Opacity = useTransform(smoothedProgress, [0.4, 0.50], [0, 1])
  const ch3Y = useTransform(smoothedProgress, [0.4, 0.50], [20, 0])

  // Chapter 4 (0.625): Trust strip rises
  const ch4Opacity = useTransform(smoothedProgress, [0.55, 0.625], [0, 1])
  const ch4Y = useTransform(smoothedProgress, [0.55, 0.625], [20, 0])


  if (!videoState) return null // or a loading state

  return (
    <section ref={containerRef} className="relative w-full h-[300svh] bg-leaf-950">
      <div className="sticky top-0 w-full h-[100svh] overflow-hidden bg-leaf-950">
        
        {/* LCP Poster beneath video */}
        <div className="absolute inset-0 w-full h-full z-0">
           {videoState.poster && (
             <Image 
                src={videoState.poster} 
                alt="Background"
                fill
                priority
                className="object-cover md:object-center object-[60%_center]"
             />
           )}
        </div>

        {/* Video Layer */}
        {!videoState.useReducedMotion && !hasError && videoState.src && (
          <video
            ref={videoRef}
            src={videoState.src}
            className="absolute inset-0 w-full h-full object-cover md:object-center object-[60%_center] z-10"
            muted
            playsInline
            disablePictureInPicture
            autoPlay={videoState.isAutoplay}
            loop={false}
            aria-hidden="true"
            onError={() => setHasError(true)}
          />
        )}

        {/* Scrim for Text Contrast */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgb(35 68 15 / .85) 0%, rgb(35 68 15 / .55) 38%, transparent 62%)'
          }}
        />

        {/* DOM Content (Chapters) */}
        <div className="absolute inset-0 z-30 container mx-auto px-6 lg:px-12 flex flex-col justify-center h-full pt-16">
          <div className="max-w-2xl text-canvas relative h-[60vh]">
            
            {/* Chapter 1: 0.0 -> 0.15 */}
            <motion.div 
              style={{ opacity: ch1Opacity }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.9] mb-4 text-leaf-50 drop-shadow-lg">
                Fresh.<br />
                <span className="text-leaf-300">Natural.</span>
              </h1>
              <p className="text-2xl md:text-3xl font-medium font-serif italic text-leaf-100 mb-8 drop-shadow">
                {siteConfig.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/menu" 
                  className="bg-leaf-300 text-leaf-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-leaf-200 transition-colors inline-flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 origin-left duration-200"
                >
                  Order Now <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex items-center gap-2 text-leaf-100 font-medium px-4 py-2 bg-leaf-950/30 backdrop-blur-sm rounded-full border border-leaf-500/30">
                  <PlayCircle className="w-5 h-5 text-leaf-300" />
                  <span>Scroll to explore</span>
                </div>
              </div>
            </motion.div>

            {/* Chapter 2: 0.33+ */}
            <motion.div
              style={{ opacity: ch2Opacity }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-leaf-50 drop-shadow-lg">
                Smart cut.<br />
                Sealed straw.<br />
                <span className="text-leaf-300">Chilled.</span>
              </h2>
            </motion.div>

            {/* Chapter 3: 0.50+ */}
            <motion.div
              style={{ opacity: ch3Opacity, y: ch3Y }}
              className="absolute inset-x-0 top-[60%] flex flex-col gap-4"
            >
              {/* Product Chips */}
              <div className="flex flex-col gap-3 pointer-events-auto w-fit">
                <Link href="/menu" className="group bg-canvas/10 backdrop-blur-md border border-canvas/20 p-3 rounded-2xl flex items-center gap-4 hover:bg-canvas/20 transition-all">
                  <div className="w-12 h-12 relative bg-leaf-900 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                    {/* Tiny placeholder for the coconut */}
                    <span className="text-[10px] font-bold text-leaf-300">COCO</span>
                  </div>
                  <div>
                    <div className="font-bold text-canvas text-sm">Premium Live Coconut</div>
                    <div className="text-leaf-300 text-xs font-semibold">৳220 • Add to cart</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-canvas opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </Link>

                <Link href="/menu" className="group bg-canvas/10 backdrop-blur-md border border-canvas/20 p-3 rounded-2xl flex items-center gap-4 hover:bg-canvas/20 transition-all">
                  <div className="w-12 h-12 relative bg-leaf-900 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-leaf-300">WATER</span>
                  </div>
                  <div>
                    <div className="font-bold text-canvas text-sm">Pure Coconut Water</div>
                    <div className="text-leaf-300 text-xs font-semibold">300ml • ৳180</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-canvas opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </Link>
              </div>
            </motion.div>

            {/* Chapter 4: 0.625+ */}
            <motion.div
              style={{ opacity: ch4Opacity, y: ch4Y }}
              className="absolute bottom-0 inset-x-0 pointer-events-none pb-8"
            >
              <div className="flex items-center gap-6 text-sm font-semibold text-leaf-200 drop-shadow">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-leaf-300" />
                  Freshly cut daily
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-leaf-300" />
                  100% Natural
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-leaf-300" />
                  No added sugar
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
