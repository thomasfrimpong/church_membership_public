import mongoose from "mongoose";
const connectMongoDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to mongodb");
  } catch (error) {
    console.error("Error connecting to mongodb".error);
  }
};

export default connectMongoDB;
