const express = require("express");
const commentController = require("../controller/commentController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

// router.get("/", topicController.getAllTopic);
// router.get("/:id", authenticate, topicController.getTopicById);
router.post("/", authenticate, commentController.createComment);
// router.put("/:id", authenticate, topicController.updateTopic);
// router.delete("/:id", authenticate, topicController.deleteTopic);
module.exports = router;
