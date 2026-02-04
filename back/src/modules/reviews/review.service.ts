import { ReviewModel } from './review.model';
import { Types } from 'mongoose';

class ReviewService {
  async create(userId: string, payload: any) {
    const doc = await ReviewModel.create({
      userId: Types.ObjectId(userId),
      targetId: Types.ObjectId(payload.targetId),
      targetType: payload.targetType,
      rating: payload.rating,
      title: payload.title,
      body: payload.body,
    });
    return doc.toObject();
  }

  async list(targetId: string, targetType: string) {
    return ReviewModel.find({ targetId: Types.ObjectId(targetId), targetType }).lean().exec();
  }
}

export const reviewService = new ReviewService();
