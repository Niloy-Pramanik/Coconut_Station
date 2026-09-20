import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem } from '@/features/pricing/compute'

interface CartState {
  items: CartItem[]
  addItem: (sku: string, quantity?: number) => void
  removeItem: (sku: string) => void
  updateQuantity: (sku: string, quantity: number) => void
  clearCart: () => void
  isSheetOpen: boolean
  setSheetOpen: (open: boolean) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isSheetOpen: false,

      addItem: (sku, quantity = 1) => set((state) => {
        const existing = state.items.find((item) => item.sku === sku)
        if (existing) {
          return {
            items: state.items.map((item) =>
              item.sku === sku ? { ...item, quantity: item.quantity + quantity } : item
            ),
            isSheetOpen: true
          }
        }
        return { 
          items: [...state.items, { sku, quantity }],
          isSheetOpen: true
        }
      }),

      removeItem: (sku) => set((state) => ({
        items: state.items.filter((item) => item.sku !== sku)
      })),

      updateQuantity: (sku, quantity) => set((state) => ({
        items: quantity <= 0 
          ? state.items.filter((item) => item.sku !== sku)
          : state.items.map((item) => item.sku === sku ? { ...item, quantity } : item)
      })),

      clearCart: () => set({ items: [] }),

      setSheetOpen: (open) => set({ isSheetOpen: open }),
    }),
    {
      name: 'cs-cart-v1', // unique name for localStorage
      storage: createJSONStorage(() => localStorage),
      // We don't persist UI state like isSheetOpen
      partialize: (state) => ({ items: state.items }),
    }
  )
)
