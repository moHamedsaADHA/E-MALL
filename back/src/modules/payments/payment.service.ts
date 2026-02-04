import { PaymentModel } from './payment.model';
import { IPaymentCreateDTO, PaymentStatus } from './payment.types';
import { OrderModel } from '../orders/order.model';
import crypto from 'crypto';

export class PaymentService {
  async createPayment(dto: IPaymentCreateDTO) {
    // one payment per order enforced by unique index on orderId
    const exists = await PaymentModel.findOne({ orderId: dto.orderId }).exec();
    if (exists) throw new Error('Payment already exists for this order');
    const created = await PaymentModel.create(dto);
    return created;
  }

  async findByProviderPaymentId(provider: string, providerPaymentId: string) {
    return PaymentModel.findOne({ provider, providerPaymentId }).exec();
  }

  async updateStatus(paymentId: string, status: PaymentStatus) {
    const payment = await PaymentModel.findById(paymentId).exec();
    if (!payment) throw new Error('Payment not found');
    payment.status = status;
    await payment.save();

    // Minimal order sync
    const order = await OrderModel.findById(payment.orderId).exec();
    if (order) {
      if (status === 'succeeded') {
        order.paymentStatus = 'paid';
        order.status = 'paid';
      } else if (status === 'failed') {
        order.paymentStatus = 'failed';
        order.status = 'pending';
      } else if (status === 'refunded') {
        order.paymentStatus = 'refunded';
        order.status = 'cancelled';
      }
      await order.save();
    }
    return payment;
  }

  async handleWebhook(provider: string, rawBody: Buffer, signatureHeader?: string) {
    const verified = this.verifySignature(provider, rawBody, signatureHeader);
    if (!verified) throw new Error('Invalid webhook signature');
    const payload = JSON.parse(rawBody.toString('utf8'));
    const providerPaymentId = payload.id || payload.data?.id || payload.resource?.id;
    const eventStatus = (payload.status || payload.data?.status || payload.resource?.status || '').toLowerCase();

    let mappedStatus: PaymentStatus = 'pending';
    if (eventStatus.includes('succeeded') || eventStatus.includes('completed') || eventStatus === 'paid') mappedStatus = 'succeeded';
    else if (eventStatus.includes('failed')) mappedStatus = 'failed';
    else if (eventStatus.includes('refunded')) mappedStatus = 'refunded';

    const payment = await PaymentModel.findOne({ provider, providerPaymentId }).exec();
    if (!payment) throw new Error('Payment not found for providerPaymentId');
    return this.updateStatus(String(payment._id), mappedStatus);
  }

  private verifySignature(provider: string, rawBody: Buffer, signatureHeader?: string | undefined) {
    if (!signatureHeader) return false;
    if (provider === 'stripe') {
      const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
      if (!secret) return false;
      const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
      try {
        const received = signatureHeader.split(',')[0];
        const a = Buffer.from(expected);
        const b = Buffer.from(received);
        return crypto.timingSafeEqual(a, b);
      } catch {
        return false;
      }
    }
    const envKey = (provider || 'other').toUpperCase() + '_WEBHOOK_SECRET';
    const secret = (process.env as any)[envKey];
    if (secret) {
      const expected = crypto.createHmac('sha256', String(secret)).update(rawBody).digest('hex');
      try {
        const received = signatureHeader;
        const a = Buffer.from(expected);
        const b = Buffer.from(received);
        return crypto.timingSafeEqual(a, b);
      } catch {
        return false;
      }
    }
    return false;
  }
}

export const paymentService = new PaymentService();
