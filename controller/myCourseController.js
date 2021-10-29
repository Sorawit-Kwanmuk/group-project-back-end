const { MyCourse, Course } = require("../models");

exports.getAllMyCourse = async (req, res, next) => {
  const result = await MyCourse.findAll({ include: { model: Course } });
  return res.json({ result });
};

exports.getAllPersonalCourse = async (req, res, next) => {
  const result = await MyCourse.findAll({
    include: { model: Course },
    where: { userId: req.user.id },
  });
  return res.json({ result });
};

exports.getAllMyCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await MyCourse.findOne({
      where: { id },
      include: { model: Course },
    });
    res.json({ result });
  } catch (error) {
    next(error.message);
  }
};

exports.getPersonalMyCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await MyCourse.findOne({
      where: { userId: req.user.id, id },
      include: { model: Course },
    });
    res.json({ result });
  } catch (error) {
    next(error.message);
  }
};

exports.updatePersonalMyCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const find = await MyCourse.findOne({
      where: { userId: req.user.id, id },
      include: { model: Course },
    });
    const result = await find.update({
      currentStage: find.currentStage + 1,
    });
    if (result.currentStage === result.totalStage) {
      const updateStatus = result.update({
        status: "completed",
      });
    }
    res.json({ result });
  } catch (error) {
    next(error.message);
  }
};
