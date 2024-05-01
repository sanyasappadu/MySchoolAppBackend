const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const studentRoutes = require("./routes/student");
const teacherRoutes = require("./routes/teacher");
const markRoutes = require('./routes/mark')
const blogRoutes = require('./routes/blog');
const app = express();
const port = 4000;
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
app.use("/api", teacherRoutes);
app.use('/api', markRoutes);
app.use('/api', blogRoutes);
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});