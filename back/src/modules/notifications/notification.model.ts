import { Schema, model, Document, Types } from 'mongoose';

export interface INotification extends Document {
  userId: Types.ObjectId;
  type: string;
  payload: any;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
  type: { type: String, required: true },
  payload: { type: Schema.Types.Mixed },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export const NotificationModel = model<INotification>('Notification', NotificationSchema);
