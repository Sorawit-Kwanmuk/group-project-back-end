const express = require("express");
const courseController = require("../controller/courseController");
const { authenticate } = require("../controller/authController");
const multer = require("multer");

const router = express.Router();

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

router.get("/", courseController.getAllCourse);
router.get("/:id", authenticate, courseController.getCourseById);
router.post(
  "/",
  authenticate,
  upload.single("thisisinput"),
  courseController.createCourse
);
router.put(
  "/:id",
  authenticate,
  upload.single("thisisinput"),
  courseController.updateCourse
);
router.delete("/:id", authenticate, courseController.deleteCourse);
module.exports = router;