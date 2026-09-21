import { Order } from "@/core/domain/types"

export interface CreateOrderDTO {
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  deliveryZoneId: string;
  deliveryAddress: string;
  deliveryNotes?: string | null;
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  total: number;
  paymentMethod: string;
  items: Array<{ sku: string; quantity: number; priceAtOrder: number }>;
}

export interface IOrderRepository {
  createOrder(data: CreateOrderDTO): Promise<Order>;
  getOrderById(id: number): Promise<Order | undefined>;
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  listOrders(status?: string): Promise<Order[]>;
  updateOrderStatus(id: number, status: string): Promise<void>;
}
