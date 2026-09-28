import { catalog } from '@/content/catalog'
import { Product } from '@/core/domain/types'

export async function getVisibleProducts(): Promise<Product[]> {
  return catalog
    .filter(p => p.status !== 'hidden')
    .sort((a, b) => (a.sort || 0) - (b.sort || 0));
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return catalog.find(p => p.slug === slug);
}
