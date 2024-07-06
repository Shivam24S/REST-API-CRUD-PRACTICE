import express from "express";

const app = express();

const port = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("started");
});

app.listen(port, (req, res) => {
  console.log("server running on " + port);
});
