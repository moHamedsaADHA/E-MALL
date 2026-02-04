import { Request, Response, NextFunction } from 'express';
import { paymentService } from './payment.service';
import { IPaymentCreateDTO } from './payment.types';

export class PaymentController {
  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: IPaymentCreateDTO = req.body;
      const created = await paymentService.createPayment(dto);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }

  // Webhook handler expects raw body buffer to perform signature verification.
  async handleWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const provider = (req.params.provider as string) || (req.headers['x-provider'] as string) || 'stripe';
      // Express apps should be configured to expose raw body as Buffer on req.rawBody for webhooks.
      const raw = (req as any).rawBody ?? Buffer.from(JSON.stringify(req.body));
      const signature = (req.headers['stripe-signature'] as string) || (req.headers['x-signature'] as string);

      await paymentService.handleWebhook(provider, raw, signature);
      res.status(200).send('ok');
    } catch (err) {
      next(err);
    }
  }
}

export const paymentController = new PaymentController();
