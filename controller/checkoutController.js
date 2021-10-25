const omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});
const { Course } = require("../models");

// const myCourse = require("../");

exports.createCheckout = async (req, res, next) => {
  const { token, courseId, price } = req.body;

  const find = await Course.findOne({ where: { id: courseId } });
  console.log(`find`, find.price);

  try {
    const charge = await omise.charges.create({
      amount: price,
      currency: "thb",
      card: token,
      metadata: { courseId: courseId, user: req.user.id },
    });
    console.log(`charge -------> `, charge);

    // if (charge.status === "successful") {
    //   const myCourse = await Course.create({});
    // }
    return res.json(charge);
  } catch (error) {
    next(error);
  }
};
