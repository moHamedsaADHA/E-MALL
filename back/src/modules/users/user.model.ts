import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  roles: string[];
  shopId?: string | null;
  isVerified: boolean;
  emailVerificationToken?: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['buyer'] },
  shopId: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
}, { timestamps: true });

export const UserModel = model<IUser>('User', userSchema);
