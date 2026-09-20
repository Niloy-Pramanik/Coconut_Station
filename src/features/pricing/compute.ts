import { resolveSku, isOrderable } from "@/features/catalog/resolve"

export interface CartItem {
  sku: string
  quantity: number
}

export interface PricingResult {
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  errors: string[]
}

export interface DeliveryZone {
  id: string
  name: string
  fee: number
  minOrder: number
  freeDeliveryThreshold?: number
}

export const DELIVERY_ZONES: Record<string, DeliveryZone> = {
  pickup: {
    id: 'pickup',
    name: 'Pickup from Outlet',
    fee: 0,
    minOrder: 0,
  },
  local: {
    id: 'local',
    name: 'Local Delivery (Dhaka)',
    fee: 60,
    minOrder: 300,
    freeDeliveryThreshold: 1500, // Free delivery for orders over 1500
  }
}

/**
 * Computes pricing for a given list of cart items and delivery zone.
 * It strictly validates that all items exist and have a valid price.
 */
export function computePricing(items: CartItem[], zoneId: string = 'pickup', discountAmount: number = 0): PricingResult {
  const result: PricingResult = {
    subtotal: 0,
    deliveryFee: 0,
    discount: discountAmount,
    total: 0,
    errors: [],
  }

  // 1. Calculate subtotal
  for (const item of items) {
    if (item.quantity <= 0) {
      result.errors.push(`Invalid quantity for SKU: ${item.sku}`)
      continue
    }

    const resolved = resolveSku(item.sku)
    if (!resolved) {
      result.errors.push(`Unknown SKU: ${item.sku}`)
      continue
    }

    if (!isOrderable(resolved.variant) || resolved.variant.priceBDT === null) {
      result.errors.push(`SKU is not orderable at this time: ${item.sku}`)
      continue
    }

    result.subtotal += resolved.variant.priceBDT * item.quantity
  }

  // 2. Validate Delivery Zone
  const zone = DELIVERY_ZONES[zoneId]
  if (!zone) {
    result.errors.push(`Unknown delivery zone: ${zoneId}`)
    return result
  }

  if (result.subtotal > 0 && result.subtotal < zone.minOrder) {
    result.errors.push(`Minimum order amount for ${zone.name} is ৳${zone.minOrder}.`)
  }

  // 3. Compute Delivery Fee
  if (zone.freeDeliveryThreshold && result.subtotal >= zone.freeDeliveryThreshold) {
    result.deliveryFee = 0
  } else {
    result.deliveryFee = zone.fee
  }

  // 4. Compute Total
  result.total = Math.max(0, result.subtotal + result.deliveryFee - result.discount)

  return result
}
