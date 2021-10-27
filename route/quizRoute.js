const express = require("express");
const quizController = require("../controller/quizController");
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

router.get("/", quizController.getAllQuiz);
router.get("/:id", authenticate, quizController.getQuizById);
router.post(
  "/",
  authenticate,
  upload.single("thisisinput"),
  quizController.createQuiz
);
router.put("/:id", authenticate, quizController.updateQuiz);
router.delete("/:id", authenticate, quizController.deleteQuiz);
module.exports = router;
