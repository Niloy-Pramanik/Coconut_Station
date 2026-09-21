import { Product } from "@/core/domain/types"

export interface ICatalogRepository {
  getVisibleCatalog(): Promise<Product[]>
  getProductBySlug(slug: string): Promise<Product | undefined>
  updateCatalogItem(sku: string, data: { isSoldOut?: boolean; priceBDT?: number }): Promise<void>
}
