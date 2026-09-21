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

export const orderAuditEvents = pgTable('order_audit_events', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull().references(() => orders.id),
  action: text('action').notNull(), // e.g., 'status_changed', 'payment_verified'
  previousStatus: text('previous_status'),
  newStatus: text('new_status'),
  notes: text('notes'),
  actor: text('actor').notNull().default('system'), // 'admin' or 'system'
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const catalogOverrides = pgTable('catalog_overrides', {
  sku: text('sku').primaryKey(),
  isSoldOut: boolean('is_sold_out').notNull().default(false),
  priceBDT: integer('price_bdt'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const promoCodes = pgTable('promo_codes', {
  code: text('code').primaryKey(),
  discountAmount: integer('discount_amount'), // Flat discount in BDT
  discountPercent: integer('discount_percent'), // Percentage discount (0-100)
  isActive: boolean('is_active').notNull().default(true),
  minOrderValue: integer('min_order_value').default(0), // Minimum order total to apply
  maxUses: integer('max_uses'), // Null means unlimited
  timesUsed: integer('times_used').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  type: text('type').notNull(), // 'contact', 'event', 'bulk'
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone').notNull(),
  eventDate: text('event_date'),
  guests: integer('guests'),
  area: text('area'),
  items: text('items'), // json array of items
  details: text('details'),
  status: text('status').notNull().default('new'), // 'new', 'read', 'replied'
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const subscribers = pgTable('subscribers', {
  id: serial('id').primaryKey(),
  contact: text('contact').notNull(), // email or phone
  city: text('city').notNull(), // dhaka, bogura, other
  consent: boolean('consent').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

