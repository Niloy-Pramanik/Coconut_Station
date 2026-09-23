import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { catalogRepo } from '@/core/di'

export async function GET() {
  try {
    const products = await catalogRepo.getVisibleCatalog()

    // Flatten to the format expected by the admin panel
    const currentCatalog = products.flatMap(product => {
      return product.variants.map(variant => {
        return {
          sku: variant.sku,
          name: product.nameEn + (product.variants.length > 1 ? ` - ${variant.nameEn}` : ''),
          volumeML: parseInt(variant.nameEn.replace(/[^0-9]/g, '')) || 0,
          isSoldOut: variant.isSoldOut ?? false,
          priceBDT: variant.priceBDT,
        }
      })
    })

    return NextResponse.json({ catalog: currentCatalog })
  } catch (error) {
    console.error('Error fetching catalog:', error)
    return NextResponse.json({ error: 'Failed to fetch catalog' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sku, isSoldOut, priceBDT } = body

    if (!sku) {
      return NextResponse.json({ error: 'SKU is required' }, { status: 400 })
    }

    // Use repository instead of direct DB insert
    await catalogRepo.updateCatalogItem(sku, {
      isSoldOut: Boolean(isSoldOut),
      priceBDT: priceBDT ? parseInt(priceBDT, 10) : undefined,
    })

    revalidatePath('/', 'layout')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating catalog:', error)
    return NextResponse.json({ error: 'Failed to update catalog' }, { status: 500 })
  }
}
