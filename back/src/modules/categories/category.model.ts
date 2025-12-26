import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug?: string;
  parentId?: string | null; // hierarchical parent
  metadata?: any;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, index: true },
  slug: { type: String, index: true },
  parentId: { type: String, default: null, index: true },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });

export const CategoryModel = model<ICategory>('Category', categorySchema);
