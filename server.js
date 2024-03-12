const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const studentRoutes = require("./routes/student");

const app = express();
const port = 6000;
dotenv.config();
app.use(express.json());

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};
app.use("/api", studentRoutes);

app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});