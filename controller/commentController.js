const { Comment } = require("../models");
const { Course, Topic, Instructor } = require("../models");
const { Op } = require("sequelize");

exports.createComment = async (req, res, next) => {
  try {
    const { commentName, rating, commentBody, courseId } = req.body;
    const find = await Course.findOne({ where: { id: courseId } });
    const courseRating = +find.rating;
    const courseRatingAmount = +find.ratingAmount;
    const courseRatingTotal = +find.ratingTotal;

    const findTopic = await Topic.findAll({ where: { courseId: courseId } });
    const mapTopic = findTopic.map(item => item.instructorId);
    const findIns = await Instructor.findAll({
      where: { id: { [Op.or]: mapTopic } },
    });

    console.log(`findTopic`, findTopic);
    console.log(`mapTopic`, mapTopic);
    console.log(`findins`, findIns);

    const result = await Comment.create({
      userId: req.user.id,
      commentName,
      rating,
      commentBody,
      courseId,
    });
    // console.log(`result`, result);
    // console.log(`rating ---->`, courseRating);
    // console.log(`result.rating ---->`, result.rating);
    // console.log(`courseRatingAmount ---->`, courseRatingAmount);
    const totalRating =
      (+courseRatingTotal + +result.rating) / (courseRatingAmount + 1);
    // console.log(`typeof totalRating`, typeof totalRating);
    const updateCourse = await find.update({
      ratingAmount: courseRatingAmount + 1,
      rating: totalRating.toFixed(2),
      ratingTotal: courseRatingTotal + result.rating,
    });
    // console.log(`updateCourse`, updateCourse);

    findIns.forEach(async item => {
      const insUpdate = await Instructor.findByPk(item.id);

      insUpdate.ratingAmount = insUpdate.ratingAmount + 1;

      insUpdate.rating = (
        (Number(insUpdate.ratingTotal) + Number(result.rating)) /
        insUpdate.ratingAmount
      ).toFixed(2);

      insUpdate.ratingTotal = +insUpdate.ratingTotal + +result.rating;

      console.log(`insUpdate`, insUpdate.rating);
      console.log(`insUpdate`, insUpdate.ratingTotal);
      console.log(`insUpdate`, result.rating);
      insUpdate.save();
    });

    return res.json({ result, updateCourse });
  } catch (error) {
    next(error);
  }
};
