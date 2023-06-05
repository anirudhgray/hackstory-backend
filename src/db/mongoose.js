import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('Connected to DB.');
  } catch (e) {
    console.log('Oops.');
    console.log(e);
    process.exit(1);
  }
};
