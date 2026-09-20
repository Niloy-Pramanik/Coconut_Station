import { pgTable, text, serial, timestamp, integer, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(), // e.g., CS-1001
  status: text('status').notNull().default('pending'), // pending, confirmed, out_for_delivery, delivered, cancelled
  
  // Customer Info
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerEmail: text('customer_email'),
  
  // Delivery Info
  deliveryZoneId: text('delivery_zone_id').notNull(),
  deliveryAddress: text('delivery_address').notNull(),
  deliveryNotes: text('delivery_notes'),
  
  // Pricing (in BDT)
  subtotal: integer('subtotal').notNull(),
  deliveryFee: integer('delivery_fee').notNull(),
  discount: integer('discount').notNull().default(0),
  total: integer('total').notNull(),
  
  paymentMethod: text('payment_method').notNull().default('cash_on_delivery'), // cash_on_delivery, bkash
  paymentStatus: text('payment_status').notNull().default('pending'), // pending, paid

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull().references(() => orders.id),
  sku: text('sku').notNull(),
  quantity: integer('quantity').notNull(),
  priceAtOrder: integer('price_at_order').notNull(), // To lock in price
})

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}))
