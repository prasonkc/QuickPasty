import mongoose from "mongoose";

export const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGODB_URI as string;

  if (!uri) throw new Error("MONGODB_URI not found in .env");

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};
