import { Variant } from "@/core/domain/types"

/**
 * Helper to check if a variant is orderable.
 */
export function isOrderable(variant: Variant): boolean {
  return variant.priceBDT !== null && !variant.isSoldOut
}
