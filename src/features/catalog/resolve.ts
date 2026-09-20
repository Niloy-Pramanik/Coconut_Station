import { catalog } from "@/content/catalog"
import { Product, Variant } from "./types"

/**
 * Returns all products that are not marked as hidden.
 * Coming soon products are included so they can be displayed as teasers.
 */
export function getVisibleCatalog(): Product[] {
  return catalog
    .filter(p => p.status !== 'hidden')
    .sort((a, b) => a.sort - b.sort)
}

/**
 * Get a specific product by its slug.
 */
export function getProductBySlug(slug: string): Product | undefined {
  return catalog.find(p => p.slug === slug)
}

/**
 * Given a SKU, finds the product and variant.
 */
export function resolveSku(sku: string): { product: Product; variant: Variant } | undefined {
  for (const product of catalog) {
    const variant = product.variants.find(v => v.sku === sku)
    if (variant) {
      return { product, variant }
    }
  }
  return undefined
}

/**
 * Helper to check if a variant is orderable.
 * It must have a non-null price.
 */
export function isOrderable(variant: Variant): boolean {
  return variant.priceBDT !== null
}
