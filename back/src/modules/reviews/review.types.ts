import { Types } from 'mongoose';

export interface IReviewDTO {
  id?: string;
  userId: Types.ObjectId | string;
  targetId: Types.ObjectId | string;
  targetType: 'product' | 'shop';
  rating: number;
  title?: string;
  body?: string;
  createdAt?: string;
}
