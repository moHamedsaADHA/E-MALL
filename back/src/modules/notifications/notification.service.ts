import { NotificationModel } from './notification.model';

class NotificationService {
  async list(userId: string) {
    return NotificationModel.find({ userId }).lean().exec();
  }
}

export const notificationService = new NotificationService();
