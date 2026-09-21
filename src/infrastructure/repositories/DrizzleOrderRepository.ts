import { CreateOrderDTO, IOrderRepository } from "@/core/ports/IOrderRepository"
import { Order } from "@/core/domain/types"
import { db } from "@/db"
import { orders, orderItems } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

export class DrizzleOrderRepository implements IOrderRepository {
  async createOrder(data: CreateOrderDTO): Promise<Order> {
    return await db.transaction(async (tx) => {
      // 1. Generate Order Number (e.g. CS-1001)
      const latestOrder = await tx.select().from(orders).orderBy(desc(orders.id)).limit(1)
      const nextId = latestOrder.length > 0 ? latestOrder[0].id + 1 : 1000
      const orderNumber = `CS-${nextId}`

      // 2. Insert Order
      const [newOrder] = await tx.insert(orders).values({
        orderNumber,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        deliveryZoneId: data.deliveryZoneId,
        deliveryAddress: data.deliveryAddress,
        deliveryNotes: data.deliveryNotes,
        subtotal: data.subtotal,
        deliveryFee: data.deliveryFee,
        discount: data.discount ?? 0,
        total: data.total,
        paymentMethod: data.paymentMethod,
        status: 'pending',
        paymentStatus: 'pending'
      }).returning()

      // 3. Insert Items
      if (data.items && data.items.length > 0) {
        await tx.insert(orderItems).values(
          data.items.map(item => ({
            orderId: newOrder.id,
            sku: item.sku,
            quantity: item.quantity,
            priceAtOrder: item.priceAtOrder
          }))
        )
      }

      return newOrder as Order
    })
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    const res = await db.select().from(orders).where(eq(orders.id, id)).limit(1)
    return res.length > 0 ? (res[0] as Order) : undefined
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    const res = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1)
    return res.length > 0 ? (res[0] as Order) : undefined
  }

  async listOrders(status?: string): Promise<Order[]> {
    if (status) {
      const res = await db.select().from(orders).where(eq(orders.status, status)).orderBy(desc(orders.createdAt))
      return res as Order[]
    }
    const res = await db.select().from(orders).orderBy(desc(orders.createdAt))
    return res as Order[]
  }

  async updateOrderStatus(id: number, status: string): Promise<void> {
    await db.update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
  }
}
