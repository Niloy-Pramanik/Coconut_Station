export type ProductStatus = 'active' | 'hidden' | 'coming_soon'

export interface Variant {
  sku: string
  nameEn: string
  nameBn: string
  descriptionEn?: string
  descriptionBn?: string
  priceBDT: number | null
  isSoldOut?: boolean
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

export interface Order {
  id: number;
  orderNumber: string;
  status: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  deliveryZoneId: string;
  deliveryAddress: string;
  deliveryNotes: string | null;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
