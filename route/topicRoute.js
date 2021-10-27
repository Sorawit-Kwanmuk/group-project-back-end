const express = require("express");
const topicController = require("../controller/topicController");
const { authenticate } = require("../controller/authController");

const router = express.Router();

router.get("/", topicController.getAllTopic);
router.get("/:id", authenticate, topicController.getTopicById);
router.post("/", authenticate, topicController.createTopic);
router.put("/:id", authenticate, topicController.updateTopic);
router.delete("/:id", authenticate, topicController.deleteTopic);
module.exports = router;