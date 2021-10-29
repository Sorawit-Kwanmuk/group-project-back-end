const express = require("express");
const userController = require("../controller/userController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", userController.getAllUser);
router.get("/userId", authenticate, userController.getUserByUserId);

module.exports = router;
