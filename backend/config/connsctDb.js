import { connect } from "mongoose";

const connectDb = async () => {
  try {
    await connect(process.env.MONGO_URL);
    console.log("db connected");
  } catch (error) {
    console.log("connection error", error);
    process.exit(1);
  }
};

export default connectDb;
