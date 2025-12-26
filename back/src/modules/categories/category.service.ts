import { CategoryModel } from './category.model';

export class CategoryService {
  static async create(payload: any) {
    return CategoryModel.create(payload);
  }

  static async listTree() {
    // TODO: implement efficient tree retrieval (materialized path or recursive aggregation)
    return CategoryModel.find().lean();
  }
}
