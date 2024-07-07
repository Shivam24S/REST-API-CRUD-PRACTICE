import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// creating task
router.post("/task", async (req, res) => {
  try {
    const taskData = new Task(req.body);
    await taskData.save();

    res.status(201).send("new Task added successfully");
  } catch (error) {
    return res.status(400).send("something went wrong" + error.message);
  }
});

// reading tasks data

router.get("/task", async (req, res) => {
  try {
    const taskData = await Task.find({});

    if (!taskData) {
      return res.status(404).send("internal server error");
    }
    return res.status(200).send(taskData);
  } catch (error) {
    return res.status(400).send("something went wrong" + error.message);
  }
});

export default router;
