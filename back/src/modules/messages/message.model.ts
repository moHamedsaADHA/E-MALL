import { Schema, model, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  fromUserId: Types.ObjectId;
  toUserId: Types.ObjectId;
  shopId?: Types.ObjectId;
  content: string;
  read: boolean;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  fromUserId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  toUserId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  shopId: { type: Schema.Types.ObjectId, ref: 'Shop', default: null },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export const MessageModel = model<IMessage>('Message', MessageSchema);
