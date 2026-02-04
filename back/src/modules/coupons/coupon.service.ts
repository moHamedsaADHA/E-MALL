import { CouponModel } from './coupon.model';

class CouponService {
  async create(payload: any) {
    return CouponModel.create(payload);
  }

  async findByCode(code: string) {
    return CouponModel.findOne({ code }).lean().exec();
  }
}

export const couponService = new CouponService();
