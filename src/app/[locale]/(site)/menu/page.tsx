import * as React from 'react'
import { Metadata } from 'next'
import { getVisibleProducts } from '@/features/catalog/queries'
import { MenuGrid } from '@/components/menu/menu-grid'

export const metadata: Metadata = {
  title: 'Menu | Coconut Station',
  description: 'Explore our full menu of natural coconut water, desserts, and shakes.',
}

export default async function MenuPage() {
  const products = await getVisibleProducts()

  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-leaf-900 uppercase tracking-tight mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-ink-soft leading-relaxed max-w-2xl">
            Made fresh at our Tangail outlet. Also on Foodpanda and foodi.
          </p>
        </header>
        
        <MenuGrid products={products} />
      </div>
    </div>
  )
}
