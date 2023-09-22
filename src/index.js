const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRoutes = require("./routers/user-routes");
const taskRoutes = require("./routers/task-routes");

const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);

app.listen(port, () => {
  console.log("server is up on port: " + port);
});