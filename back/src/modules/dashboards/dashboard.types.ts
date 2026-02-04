export interface IShopSummary {
  totalSales: number;
  ordersCount: number;
  topProducts: Array<{ _id: string; qtySold: number; revenue: number }>;
  pendingOrders: number;
}

export interface IAdminSummary {
  totalRevenue: number;
  totalOrders: number;
  topShops: Array<{ shopId: string; revenue: number; shopName?: string }>;
  paymentsByProvider: Array<{ _id: string; count: number; sum: number }>;
}
