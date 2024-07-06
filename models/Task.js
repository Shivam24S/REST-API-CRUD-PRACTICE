import mongoose from "mongoose";

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default Task;
