import { MessageModel } from './message.model';
import { Types } from 'mongoose';

class MessageService {
  async send(fromUserId: string, toUserId: string, content: string, shopId?: string) {
    return MessageModel.create({
      fromUserId: Types.ObjectId(fromUserId),
      toUserId: Types.ObjectId(toUserId),
      content,
      shopId: shopId ? Types.ObjectId(shopId) : null,
    });
  }
}

export const messageService = new MessageService();
