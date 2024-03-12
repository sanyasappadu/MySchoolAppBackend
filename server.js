const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app = express();
const port = 6000;
dotenv.config();
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
app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});