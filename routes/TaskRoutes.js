// import express from "express";
// import Task from "../models/Task.js";

// const router = express.Router();

// // creating task
// router.post("/task", async (req, res) => {
//   try {
//     const taskData = new Task(req.body);
//     await taskData.save();

//     res.status(201).send("new Task added successfully");
//   } catch (error) {
//     return res.status(500).send("something went wrong" + error.message);
//   }
// });

// // reading tasks data

// router.get("/task", async (req, res) => {
//   try {
//     const taskData = await Task.find({});

//     if (!taskData) {
//       return res.status(404).send("internal server error");
//     }
//     return res.status(200).send(taskData);
//   } catch (error) {
//     return res.status(500).send("something went wrong" + error.message);
//   }
// });

// // updating task data

// router.patch("/task/:id", async (req, res) => {
//   const id = req.params.id;

//   //   only allowed field update

//   const allowedUpdates = ["description", "complete"];

//   const updatedKeys = Object.keys(req.body);

//   const isValidUpdate = updatedKeys.every((key) =>
//     allowedUpdates.includes(key)
//   );

//   if (!isValidUpdate) {
//     return res.status(404).send("Invalid updates Data");
//   }

//   try {
//     const updatedData = await Task.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     if (!updatedData) {
//       return res.status(404).send("couldn't find match to update");
//     }
//     return res.status(200).send("updated Data" + updatedData);
//   } catch (error) {
//     return res.status(500).send("something went wrong" + error.message);
//   }
// });

// // deleting taskData

// router.delete("/task/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const deletingData = await Task.findByIdAndDelete(id);
//     if (!deletingData) {
//       return res.status(404).send("no match found to delete");
//     }
//     res.status(200).send("data deleted successfully " + deletingData);
//   } catch (error) {
//     res.status(500).send("something went wrong" + error.message);
//   }
// });

// export default router;

// better code practicing

import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// Creating task
router.post("/task", async (req, res) => {
  try {
    const taskData = new Task(req.body);
    await taskData.save();
    res
      .status(201)
      .json({ message: "New task added successfully", data: taskData });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong: " + error.message });
  }
});

// Reading tasks data
router.get("/task", async (req, res) => {
  try {
    const taskData = await Task.find({});
    if (taskData.length === 0) {
      return res.status(404).json({ error: "No tasks found" });
    }
    res.status(200).json(taskData);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong: " + error.message });
  }
});

// Updating task data
router.patch("/task/:id", async (req, res) => {
  const id = req.params.id;

  // Only allowed field updates
  const allowedUpdates = ["description", "complete"];
  const updatedKeys = Object.keys(req.body);

  // Check if the updates are valid
  const isValidUpdate = updatedKeys.every((key) =>
    allowedUpdates.includes(key)
  );
  if (!isValidUpdate) {
    return res.status(400).json({ error: "Invalid updates data" });
  }

  try {
    const updatedData = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedData) {
      return res.status(404).json({ error: "Couldn't find match to update" });
    }

    res.status(200).json({ message: "Updated Data", data: updatedData });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong: " + error.message });
  }
});

// Deleting task data
router.delete("/task/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletingData = await Task.findByIdAndDelete(id);

    if (!deletingData) {
      return res.status(404).json({ error: "No match found to delete" });
    }

    res
      .status(200)
      .json({ message: "Data deleted successfully", data: deletingData });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong: " + error.message });
  }
});

export default router;
