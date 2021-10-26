const { Topic, SubTopic } = require('../models');

exports.createSubTopic = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const { subTopName, video, document, topicId } = req.body;
      const result = await SubTopic.create({
        subTopName,
        video,
        document,
        topicId,
      });
      return res.json({ result });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error);
  }
};

exports.getAllSubTopic = async (req, res, next) => {
  try {
    const result = await SubTopic.findAll({
      include: { model: Topic, attributes: ['topicName'] },
    });
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getSubTopicById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await SubTopic.findOne({ where: { id } });
    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.updateSubTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subTopName, video, document, topicId } = req.body;
    if (req.user.role === 'admin') {
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
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error.message);
  }
};

exports.deleteSubTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role === 'admin') {
      const rows = await SubTopic.destroy({
        where: {
          id,
        },
      });
      // console.log(rows);
      if (rows === 0) {
        return res.status(400).json({ message: 'fail to delete Sub Topic' });
      }

      return res.status(204).json({ message: 'Delete Successfully' });
    }
    return res.status(401).json({ message: 'you are unauthorized' });
  } catch (error) {
    next(error.message);
  }
};
