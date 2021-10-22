const express = require("express");
const instructorController = require("../controller/instructorController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", instructorController.getAllInstructor);
// router.get("/:id", authenticate, categoryController.getCatById);
router.post("/", authenticate, instructorController.createInstructor);
router.put("/:id", authenticate, instructorController.updateInstructor);
router.delete("/:id", authenticate, instructorController.deleteInstructor);
module.exports = router;
