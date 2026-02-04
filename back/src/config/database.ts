import mongoose from 'mongoose';
import logger from '../utils/logger';

export async function connectDatabase(uri?: string) {
  const mongoUri = uri || process.env.MONGO_URI || 'mongodb://localhost:27017/emall';
  await mongoose.connect(mongoUri, { autoIndex: true });
  logger.info('Connected to MongoDB');
}

export default connectDatabase;
