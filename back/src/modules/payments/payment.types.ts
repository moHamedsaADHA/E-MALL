export type PaymentProvider = 'stripe' | 'paypal' | 'other';
export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded';

export interface IPaymentCreateDTO {
  orderId: string;
  shopId: string;
  userId: string;
  provider: PaymentProvider;
  providerPaymentId: string;
  amount: string;
  currency: string;
}

export interface IPaymentDTO extends IPaymentCreateDTO {
  id: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}
