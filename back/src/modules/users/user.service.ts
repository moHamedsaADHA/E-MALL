import { UserModel, IUser } from './user.model';

export class UserService {
  static async findById(id: string) {
    return UserModel.findById(id).lean();
  }

  static async create(payload: Partial<IUser>) {
    return UserModel.create(payload);
  }
}
