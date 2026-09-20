import * as React from 'react'
import { Metadata } from 'next'
import { getVisibleCatalog } from '@/features/catalog/resolve'
import { MenuGrid } from '@/components/menu/menu-grid'

export const metadata: Metadata = {
  title: 'Menu | Coconut Station',
  description: 'Explore our full menu of natural coconut water, desserts, and shakes.',
}

export default function MenuPage() {
  const products = getVisibleCatalog()

  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-leaf-900 uppercase tracking-tight mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-ink-soft leading-relaxed max-w-2xl">
            From farm-fresh coconuts to rich milkshakes, order natural goodness directly to your door.
          </p>
        </header>
        
        <MenuGrid products={products} />
      </div>
    </div>
  )
}
