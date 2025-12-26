import { ProductModel } from './product.model';

export class ProductService {
  static async create(payload: any) {
    return ProductModel.create(payload);
  }

  static async findByShop(shopId: string, filter: any = {}) {
    return ProductModel.find({ shopId, ...filter }).lean();
  }
}
