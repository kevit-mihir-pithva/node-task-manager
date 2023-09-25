const express = require("express");
const dbConnection = require("./db/mongoose");
const userRoutes = require("./routers/user-routes");
const taskRoutes = require("./routers/task-routes");

const app = express();
dbConnection()
app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);

module.exports = app