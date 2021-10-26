const { Topic, Quiz } = require("../models");

exports.createQuiz = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      const { quizName, score, topicId } = req.body;
      const result = await Quiz.create({
        quizName,
        score,
        topicId,
      });
      return res.json({ result });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error);
  }
};

exports.getAllQuiz = async (req, res, next) => {
  try {
    const result = await Quiz.findAll({
      include: { model: Topic, attributes: ["topicName"] },
    });
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getQuizById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Quiz.findOne({
      where: { id },
      include: { model: Topic, attributes: ["topicName"] },
    });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.updateQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subTopName, video, document, topicId } = req.body;
    if (req.user.role === "admin") {
      const [rows] = await SubTopic.update(
        {
          subTopName,
          video,
          document,
          topicId,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.json([rows]);
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error.message);
  }
};

exports.deleteSubTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role === "admin") {
      const rows = await SubTopic.destroy({
        where: {
          id,
        },
      });
      console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: "fail to delete Sub Topic" });
      }

      return res.status(204).json({ message: "Delete Successfully" });
    }
    return res.status(401).json({ message: "you are unauthorized" });
  } catch (error) {
    next(error.message);
  }
};
