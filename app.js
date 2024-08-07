//Modules required
const express = require("express");

//Routers
const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoutes");

const morgan = require("morgan");

const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// 1) MIDDLEWARES
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "view"));

//Serving Static files in the public folder
app.use(express.static(path.join(__dirname, "./public")));

//Global Middleware
app.use(bodyParser.json());

//Routes
app.use("/", viewRouter);
app.use("/about", viewRouter);
app.use("/api/v1/users/create-user", userRouter);
// app.use("/api/v1/users", userRouter);

module.exports = app;
