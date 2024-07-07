import mongoose from "mongoose";

async function connectingDb() {
  try {
    const dbConnect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/CRUD-Task-Api"
    );
    if (!dbConnect) {
      return console.log("failed to connect DB");
    }

    console.log("DB connected successfully");
  } catch (error) {
    console.error(error.message);
  }
}

connectingDb();
