// สร้าง table จาก models
// const { sequelize } = require("./models");
// sequelize.sync({
//   force: true,
// });

require("dotenv").config();
const multer = require("multer");
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;
const app = express();
const utils = require("util");
const authRoute = require("./route/authRoute");
const categoryRoute = require("./route/categoryRoute");
const instructorRoute = require("./route/instructorRoute");
const instructorCatRoute = require("./route/instructorCatRoute");

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/public", express.static("public"));
app.use("/auth", authRoute);
app.use("/category", categoryRoute);
app.use("/instructor", instructorRoute);
app.use("/insCat", instructorCatRoute);

const uploadPromise = utils.promisify(cloudinary.uploader.upload);
//path not found handling middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});

//error handling middleware
// app.use(errorController);

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, "public/image");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "." + file.mimetype.split("/")[1]);
    },
  }),
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
