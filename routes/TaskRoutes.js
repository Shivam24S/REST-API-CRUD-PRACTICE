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

// updating task data

router.patch("/task/:id", async (req, res) => {
  const id = req.params.id;

  //   only allowed field update

  const allowedUpdates = ["description", "complete"];

  const updatedKeys = Object.keys(req.body);

  const isValidUpdate = updatedKeys.every((key) =>
    allowedUpdates.includes(key)
  );

  if (!isValidUpdate) {
    return res.status(404).send("Invalid updates Data");
  }

  try {
    const updatedData = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedData) {
      return res.status(404).send("couldn't find match to update");
    }
    return res.status(200).send("updated Data" + updatedData);
  } catch (error) {
    return res.status(404).send("something went wrong" + error.message);
  }
});

export default router;
