import { ShopModel } from './shop.model';

export class ShopService {
  static async create(payload: any) {
    return ShopModel.create(payload);
  }

  static async findById(id: string) {
    return ShopModel.findById(id).lean();
  }
}
