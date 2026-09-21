"use client"

import React, { createContext, useContext, useMemo } from 'react'
import { Product, Variant } from '@/core/domain/types'

type CatalogContextType = {
  catalog: Product[]
}

const CatalogContext = createContext<CatalogContextType | null>(null)

export function CatalogProvider({ catalog, children }: { catalog: Product[], children: React.ReactNode }) {
  return (
    <CatalogContext.Provider value={{ catalog }}>
      {children}
    </CatalogContext.Provider>
  )
}

export function useCatalog() {
  const context = useContext(CatalogContext)
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider')
  }
  return context.catalog
}

export function useResolveSku() {
  const catalog = useCatalog()
  
  return (sku: string): { product: Product; variant: Variant } | undefined => {
    for (const product of catalog) {
      const variant = product.variants.find(v => v.sku === sku)
      if (variant) {
        return { product, variant }
      }
    }
    return undefined
  }
}
