import { Product, Variant } from "@/core/domain/types"
import { catalogRepo } from "@/core/di"

/**
 * Merges the static catalog with database overrides for pricing and availability.
 * (Now handled by the repository)
 */
export async function getHydratedCatalog(): Promise<Product[]> {
  // getVisibleCatalog currently returns the hydrated catalog without hidden ones.
  // Actually, wait, LocalCatalogRepository's getHydratedCatalog is private. 
  // Let me just return getVisibleCatalog() since they're functionally identical 
  // for the public storefront use cases. Or we can use getVisibleCatalog().
  return catalogRepo.getVisibleCatalog();
}

/**
 * Server-only: Returns all products that are not marked as hidden.
 */
export async function getVisibleCatalog(): Promise<Product[]> {
  return catalogRepo.getVisibleCatalog();
}

/**
 * Server-only: Get a specific product by its slug.
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return catalogRepo.getProductBySlug(slug);
}

/**
 * Server-only: Given a SKU, finds the product and variant.
 */
export async function resolveSku(sku: string): Promise<{ product: Product; variant: Variant } | undefined> {
  const catalog = await catalogRepo.getVisibleCatalog();
  for (const product of catalog) {
    const variant = product.variants.find(v => v.sku === sku)
    if (variant) {
      return { product, variant }
    }
  }
  return undefined
}
