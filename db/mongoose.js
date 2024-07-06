// import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost:127.0.0.17/CRUD-Task-Api");

import mongoose from "mongoose";

// Connection URL and options
const url = "mongodb://127.0.0.1:27017/CRUD-Task-Api";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose
  .connect(url, options)
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
