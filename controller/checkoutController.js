const omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});
const { Course, MyCourse } = require("../models");

exports.createCheckout = async (req, res, next) => {
  const { token, courseId } = req.body;

  const find = await Course.findOne({ where: { id: courseId } });
  const price = +find.price;
  const updateLearner = +find.learner;
  console.log(`find`, price);
  console.log(`learner`, +find.learner);

  try {
    const charge = await omise.charges.create({
      amount: price * 100,
      currency: "thb",
      card: token,
      metadata: { courseId: courseId, user: req.user.id },
    });
    console.log(`charge -------> `, charge);

    if (charge.status === "successful") {
      const myCourse = await MyCourse.create({
        userId: req.user.id,
        courseId,
        totalStage: find.totalStage,
        duration: find.duration,
        price: find.price,
      });

      const enroll = await find.update({
        learner: updateLearner + 1,
      });
      return res.json({
        charge,
        myCourse,
        enroll,
      });
    }
  } catch (error) {
    next(error.message);
  }
};
