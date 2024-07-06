import express from "express";
import TaskRoutes from "../routes/TaskRoutes.js";
import "../db/mongoose.js";

const app = express();

const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(TaskRoutes);

app.get("/", (req, res) => {
  res.send("started");
});

app.listen(port, (req, res) => {
  console.log("server running on " + port);
});
