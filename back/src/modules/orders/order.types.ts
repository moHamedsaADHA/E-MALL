export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface IOrderItemDTO {
  productId: string;
  shopId: string;
  priceAtPurchase: string; // numeric string
  quantity: number;
}

export interface ICreateOrderDTO {
  userId: string;
  shopId: string;
  groupOrderId?: string;
  items: IOrderItemDTO[];
  paymentId?: string | null;
}

export interface IOrderDTO {
  id: string;
  userId: string;
  shopId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: string;
  paymentId?: string | null;
  createdAt: string;
  updatedAt: string;
  items: IOrderItemDTO[];
}
