const { Comment } = require('../models');
const { Course } = require('../models');

exports.createComment = async (req, res, next) => {
  try {
    const { commentName, rating, commentBody, courseId } = req.body;
    const find = await Course.findOne({ where: { id: courseId } });
    const courseRating = +find.rating;
    const courseRatingAmount = +find.ratingAmount;
    const courseRatingTotal = +find.ratingTotal;

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

    return res.json({ result, updateCourse });
  } catch (error) {
    next(error);
  }
};
