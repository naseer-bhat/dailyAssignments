import mongoose from "mongoose";
export const connectDB = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
