import mongoose from 'mongoose';

const connectDB = async () => {
  const connectionString = process.env.MONGO_URI;

  if (!connectionString) {
    console.error("FATAL ERROR: MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(connectionString);
    
    // Log successful connection details
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    // Log error details and exit process on failure
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;