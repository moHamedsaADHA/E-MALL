import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from './config/cors';
import { v1 as apiV1 } from './api/v1';
import { errorHandler } from './middlewares/error.middleware';
import { paymentController } from './modules/payments/payment.controller';

const app = express();

app.use(helmet());
app.use(cors as any);

// For webhook endpoints we may need raw body; mount a raw parser for /webhooks
app.use((req, res, next) => {
  if (req.originalUrl && req.originalUrl.startsWith('/api/v1/webhooks')) {
    bodyParser.raw({ type: '*/*' })(req, res, next as any);
  } else {
    bodyParser.json()(req, res, next as any);
  }
});

// Mount v1 routes
app.use('/api/v1/auth', apiV1.auth);
app.use('/api/v1/users', apiV1.users);
app.use('/api/v1/shops', apiV1.shops);
app.use('/api/v1/products', apiV1.products);
app.use('/api/v1/categories', apiV1.categories);
app.use('/api/v1/cart', apiV1.cart);
app.use('/api/v1/orders', apiV1.orders);
app.use('/api/v1/payments', apiV1.payments);
app.use('/api/v1/reviews', apiV1.reviews);
app.use('/api/v1/coupons', apiV1.coupons);
app.use('/api/v1/wishlist', apiV1.wishlist);
app.use('/api/v1/messages', apiV1.messages);
app.use('/api/v1/notifications', apiV1.notifications);
app.use('/api/v1/dashboards', apiV1.dashboards);

// Webhooks route (raw body)
app.post('/api/v1/webhooks/:provider/payments', (req, res, next) => {
  // expose raw body to controller
  (req as any).rawBody = (req as any).rawBody || req.body;
  return paymentController.handleWebhook(req as any, res as any, next);
});

app.use(errorHandler);

export default app;
