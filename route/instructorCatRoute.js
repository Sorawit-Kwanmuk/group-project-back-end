const express = require("express");
const instructorCatController = require("../controller/instuctorCatController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", instructorCatController.getAllInstructorCat);
// router.get("/:id", authenticate, categoryController.getCatById);
router.post("/", authenticate, instructorCatController.addInstructorCat);
// router.put("/:id", authenticate, instructorController.updateInstructor);
router.delete("/", authenticate, instructorCatController.deleteInstructorCat);
module.exports = router;
