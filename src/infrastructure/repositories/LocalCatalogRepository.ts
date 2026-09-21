import { ICatalogRepository } from "@/core/ports/ICatalogRepository"
import { Product } from "@/core/domain/types"
import { catalog as staticCatalog } from "@/content/catalog"
import { db } from "@/db"
import { catalogOverrides } from "@/db/schema"
import { eq } from "drizzle-orm"

export class LocalCatalogRepository implements ICatalogRepository {
  private async getHydratedCatalog(): Promise<Product[]> {
    try {
      const overrides = await db.select().from(catalogOverrides)
      const overridesBySku = overrides.reduce((acc, curr) => {
        acc[curr.sku] = curr
        return acc
      }, {} as Record<string, typeof overrides[0]>)

      return staticCatalog.map(product => ({
        ...product,
        variants: product.variants.map(variant => {
          const override = overridesBySku[variant.sku]
          
          let isSoldOut = override?.isSoldOut ?? variant.isSoldOut

          if (override && override.isSoldOut) {
            // Check if updatedAt is before today 04:00 Asia/Dhaka
            const now = new Date()
            const formatter = new Intl.DateTimeFormat('en-US', {
              timeZone: 'Asia/Dhaka',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            const parts = formatter.formatToParts(now)
            const year = parts.find(p => p.type === 'year')?.value
            const month = parts.find(p => p.type === 'month')?.value
            const day = parts.find(p => p.type === 'day')?.value
            
            if (year && month && day) {
              const resetTimeStr = `${year}-${month}-${day}T04:00:00.000+06:00`
              const resetTime = new Date(resetTimeStr)
              
              // If it's before 4 AM currently, the reset time was yesterday's 4 AM
              if (now.getTime() < resetTime.getTime()) {
                resetTime.setDate(resetTime.getDate() - 1)
              }

              if (override.updatedAt.getTime() < resetTime.getTime()) {
                isSoldOut = false
              }
            }
          }

          return {
            ...variant,
            priceBDT: override?.priceBDT ?? variant.priceBDT,
            isSoldOut,
          }
        })
      }))
    } catch (error) {
      console.error("Failed to fetch catalog overrides, returning static catalog:", error)
      return staticCatalog
    }
  }

  async getVisibleCatalog(): Promise<Product[]> {
    const catalog = await this.getHydratedCatalog()
    return catalog
      .filter(p => p.status !== 'hidden')
      .sort((a, b) => a.sort - b.sort)
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const catalog = await this.getHydratedCatalog()
    return catalog.find(p => p.slug === slug)
  }

  async updateCatalogItem(sku: string, data: { isSoldOut?: boolean; priceBDT?: number }): Promise<void> {
    const existing = await db.select().from(catalogOverrides).where(eq(catalogOverrides.sku, sku)).limit(1)
    
    if (existing.length > 0) {
      await db.update(catalogOverrides)
        .set({
          ...(data.isSoldOut !== undefined && { isSoldOut: data.isSoldOut }),
          ...(data.priceBDT !== undefined && { priceBDT: data.priceBDT }),
          updatedAt: new Date()
        })
        .where(eq(catalogOverrides.sku, sku))
    } else {
      await db.insert(catalogOverrides).values({
        sku,
        isSoldOut: data.isSoldOut ?? false,
        priceBDT: data.priceBDT ?? null,
      })
    }
  }
}
