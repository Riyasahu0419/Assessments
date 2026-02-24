import mongoose from 'mongoose';

export const connectMongoDB = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectMongoDB = async (): Promise<void> => {
  await mongoose.disconnect();
};
