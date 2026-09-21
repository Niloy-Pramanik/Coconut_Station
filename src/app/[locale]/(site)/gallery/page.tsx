import * as React from "react"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Gallery | Coconut Station",
  description: "A glimpse into our coconut moments and lifestyle.",
}

// Mock gallery data
const GALLERY_IMAGES = [
  { id: 1, src: "/assets/scenes/outlet-exterior.webp", alt: "Outlet Exterior", aspect: "aspect-[4/3]" },
  { id: 2, src: "/assets/products/water-1l.webp", alt: "Coconut Water 1L", aspect: "aspect-[3/4]" },
  { id: 3, src: "/assets/scenes/outlet-interior.webp", alt: "Outlet Interior", aspect: "aspect-[1/1]" },
  { id: 4, src: "/assets/products/pudding-classic.webp", alt: "Coconut Pudding", aspect: "aspect-[4/5]" },
  { id: 5, src: "/assets/products/coconut-regular.webp", alt: "Regular Coconut", aspect: "aspect-[3/4]" },
  { id: 6, src: "/assets/products/water-500ml.webp", alt: "Coconut Water 500ml", aspect: "aspect-[1/1]" },
]

export default function GalleryPage() {
  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-leaf-900 uppercase tracking-tight mb-6">
            Gallery
          </h1>
          <p className="text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto">
            Moments from the station and the people who love our coconuts.
          </p>
        </header>

        {/* Masonry Grid (CSS Columns) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((image) => (
            <div
              key={image.id}
              className={`relative w-full rounded-xl overflow-hidden bg-leaf-50 break-inside-avoid group ${image.aspect}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
