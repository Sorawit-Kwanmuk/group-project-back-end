//สร้าง table จาก models
// const { sequelize } = require("./models");
// sequelize.sync({
//   force: true,
// });

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const app = express();
app.use(passport.initialize());
app.use(express.json());
app.use(cors());
app.use("/public", express.static("public"));

//path not found handling middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});

//error handling middleware
// app.use(errorController);

const port = process.env.PORT || 3000;
console.log(`process.env.PORT`, process.env.PORT);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
