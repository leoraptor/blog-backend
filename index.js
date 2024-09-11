const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentsRoute");
const port = 5000;

//middle wares
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/api", userRoutes, postRoute, commentRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send("something went wrong!");
});

mongoose
  .connect("mongodb://localhost:27017/blogdb")
  .then((res) => {
    console.log("db connected succesfully");
    app.listen(port, () => {
      console.log(`server running at port ${port}`);
    });
  })
  .catch((err) => console.log(err));
