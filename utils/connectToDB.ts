import mongoose from 'mongoose';
import { logger } from './logger';

export async function connectToDB() {
  const dbUri = process.env.DB_URL || '';

  try {
    await mongoose.connect(dbUri);
    logger.info('Connected to DB...');
  } catch (error) {
    logger.error('Connection to DB Failed!', error);
    process.exit(1);
  }
}
