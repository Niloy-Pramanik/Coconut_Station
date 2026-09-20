export type ProductStatus = 'active' | 'hidden' | 'coming_soon'

export interface Variant {
  sku: string
  nameEn: string
  nameBn: string
  descriptionEn?: string
  descriptionBn?: string
  priceBDT: number | null
  imageAlt: string
  imageSrc: string
}

export interface Product {
  slug: string
  nameEn: string
  nameBn: string
  descriptionEn: string
  descriptionBn: string
  category: string
  tags: string[]
  allergens: string[]
  status: ProductStatus
  sort: number
  variants: Variant[]
}
