import { OrderModel } from '../orders/order.model';
import { ProductModel } from '../products/product.model';
import { ShopModel } from '../shops/shop.model';
import { PaymentModel } from '../payments/payment.model';
import { Types } from 'mongoose';

class DashboardService {
  async shopSummary(shopId: string) {
    const shopObj = Types.ObjectId(shopId);

    const totalSalesAgg = await OrderModel.aggregate([
      { $match: { shopId: shopObj, paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: { $toDouble: '$totalAmount' } }, orders: { $sum: 1 } } },
    ]).exec();

    const topProducts = await OrderModel.aggregate([
      { $match: { shopId: shopObj, paymentStatus: 'paid' } },
      { $unwind: '$items' },
      { $match: { 'items.shopId': shopObj } },
      { $group: { _id: '$items.productId', qtySold: { $sum: '$items.quantity' }, revenue: { $sum: { $toDouble: '$items.priceAtPurchase' } } } },
      { $sort: { qtySold: -1 } },
      { $limit: 10 },
    ]).exec();

    const pendingOrders = await OrderModel.countDocuments({ shopId: shopObj, status: 'pending' }).exec();

    return {
      totalSales: totalSalesAgg[0]?.total || 0,
      ordersCount: totalSalesAgg[0]?.orders || 0,
      topProducts,
      pendingOrders,
    };
  }

  async adminSummary() {
    const totalRevenueAgg = await OrderModel.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: { $toDouble: '$totalAmount' } }, orders: { $sum: 1 } } },
    ]).exec();

    const topShops = await OrderModel.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: '$shopId', revenue: { $sum: { $toDouble: '$totalAmount' } } } },
      { $sort: { revenue: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'shops', localField: '_id', foreignField: '_id', as: 'shop' } },
      { $unwind: { path: '$shop', preserveNullAndEmptyArrays: true } },
      { $project: { shopId: '$_id', revenue: 1, shopName: '$shop.name' } },
    ]).exec();

    const paymentsAgg = await PaymentModel.aggregate([
      { $group: { _id: '$provider', count: { $sum: 1 }, sum: { $sum: { $toDouble: '$amount' } } } },
    ]).exec();

    return {
      totalRevenue: totalRevenueAgg[0]?.total || 0,
      totalOrders: totalRevenueAgg[0]?.orders || 0,
      topShops,
      paymentsByProvider: paymentsAgg,
    };
  }
}

export const dashboardService = new DashboardService();
