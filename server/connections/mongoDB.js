import mongoose from 'mongoose';
export default function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Conneted');
  } catch (error) {
    console.log('MongoDB Connection error ' + error);
  }
}
